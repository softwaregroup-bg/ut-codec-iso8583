'use strict';
var merge = require('lodash.merge');
var defaultFields = require('./fields');
var bitSyntax = require('ut-bitsyntax');
const maskSymbol = Buffer.from('*', 'ascii').toString('hex');

function convertError(msg) {
    return Object.keys(msg).reduce((prev, current) => {
        prev[(/^[^A-Za-z_]/.test(current) ? 'iso' : '') + current] = msg[current];
        return prev;
    }, {iso: msg});
}

function getFormat(format, fallback) {
    return (format && {'numeric': 'string-left-zero', 'string': 'string-right-space', 'amount': 'string-left-zero', 'bcdamount': 'string'}[format]) || format || fallback || 'binary';
}

const getMaskList = (arr, objArr) => {
    return arr
        .filter((v) => objArr[v.split(':').shift()])
        .map((v) => {
            let enc = 'ascii';
            if (v.endsWith(':hex')) {
                enc = 'hex';
                v = v.split(':').shift();
            }
            return Buffer.from(objArr[v], enc).toString('hex');
        });
};

const decodeBufferMask = (maskFields) => (buffer, messageParsed) => {
    var maskList = getMaskList(maskFields, messageParsed);

    if (maskList.length) { // TODO: set some emv default field
        var newBuffer = maskList.reduce((a, cur) => {
            return a.split(cur).join((new Array(cur.length / 2)).fill(maskSymbol).join(''));
        }, buffer.toString('hex'));

        return Buffer.from(newBuffer, 'hex');
    }
    return buffer;
};

const encodeBufferMask = (maskFields) => (buffer, message) => {
    var maskList = getMaskList(maskFields, message);
    if (maskList.length) {
        var newBuffer = maskList.reduce((a, cur) => {
            return a.split(cur).join((new Array(cur.length / 2)).fill(maskSymbol).join(''));
        }, buffer.toString('hex'));

        return Buffer.from(newBuffer, 'hex');
    }
    return buffer;
};

function Iso8583(config) {
    if (!config.defineError) {
        throw new Error('Missing config.defineError, check if are you using latest version of ut-port-tcp.');
    }
    if (!config.getError) {
        throw new Error('Missing config.getError, check if are you using latest version of ut-port-tcp.');
    }
    if (!config.fetchErrors) {
        throw new Error('Missing config.fetchErrors, check if are you using latest version of ut-port-tcp.');
    }
    const maskFields = config.maskFields || ['2', '35'];
    this.errors = require('./errors')(config);
    this.decodeBufferMask = decodeBufferMask(maskFields);
    this.encodeBufferMask = encodeBufferMask(maskFields);
    this.networkCodes = Object.assign({
        '001': 'keyChange',
        '002': 'signOff',
        '061': 'echo',
        '161': 'keyChange',
        '201': 'cutOver',
        '301': 'echo'
    }, config.networkCodes);
    this.emvParser = require('ut-emv');
    this.successResponseIdentifier = config.successResponseIdentifier || '00';
    this.fieldFormat = merge({}, defaultFields[(config.version || '0') + (config.baseEncoding || 'ascii')], config.fieldFormat);
    this.framePattern = bitSyntax.matcher('header:' + this.fieldFormat.header.size + '/' + getFormat(this.fieldFormat.header.format) +
        ', mtid:' + this.fieldFormat.mtid.size + '/' + getFormat(this.fieldFormat.mtid.format) +
        ', field0:' + this.fieldFormat['0'].size + '/' + getFormat(this.fieldFormat['0'].format) +
        ', rest/binary');
    this.fieldPatterns = [];
    this.fieldBuilders = [bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat['0'].format))];
    this.fieldBuilders.mtid = bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat.mtid.format));
    this.fieldBuilders.header = bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat.header.format));
    this.fieldBuilders.footer = bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat.footer.format));
    this.prefixBuilders = [null];
    this.footerMatcher = bitSyntax.matcher('footer:' + this.fieldFormat.footer.size + '/' + getFormat(this.fieldFormat.footer.format) + ', rest/binary');
    var group = 0;
    while (this.fieldFormat[(group + 1) * 64]) {
        var pattern = [];
        for (var i = 1; i <= 64; i += 1) {
            var field = group * 64 + i;
            if (this.fieldFormat[field].prefixSize) { // if the field is with variable size
                let factor = this.fieldFormat[field].prefixFactor;
                pattern.push('prefix' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].prefixFormat, 'string-left-zero') +
                    ', field' + field + ':prefix' + field + '/' + getFormat(this.fieldFormat[field].format) + (factor ? '-unit:' + (8 / factor) : ''));
                this.prefixBuilders.push(bitSyntax.parse('prefix:' + this.fieldFormat[field].prefixSize + '/' +
                    getFormat(this.fieldFormat[field].prefixFormat, 'string-left-zero')));
            } else { // if the field is with fixed size
                pattern.push('field' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].format));
                this.prefixBuilders.push(null);
            }
            this.fieldBuilders.push(bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat[field].format)));
        }
        pattern.push('rest/binary');
        this.fieldPatterns.push(bitSyntax.matcher(pattern.join(', ')));
        group += 1;
    }
}

Iso8583.prototype.fieldSizes = function(bitmap, start) {
    /* jshint bitwise: false */
    var result = {};
    for (var i = 0; i <= 63; i += 1) {
        var size = bitmap && ((bitmap[i >> 3] & (128 >> (i % 8))) !== 0);
        if (size) {
            result['field' + (start + i) + 'Size'] = this.fieldFormat[start + i].prefixSize || this.fieldFormat[start + i].size;
        } else {
            result['field' + (start + i) + 'Size'] = 0;
        }
    }
    return result;
};

Iso8583.prototype.decode = function(buffer, $meta, context, log) {
    var internalError = false;
    var message = {};
    try {
        if (log && log.trace) {
            let bufferMasked = this.decodeBufferMask(buffer, message);
            log.trace({$meta: {mtid: 'frame', method: 'iso8583.decode'}, message: bufferMasked, log: context && context.session && context.session.log});
        }
        var frame = this.framePattern(buffer);
        var bitmapField = 0;
        if (frame) {
            message = {'header': frame.header, 'mtid': frame.mtid, '0': frame.field0};
            var parsedLength = buffer.length - frame.rest.length;
            var group = 0;
            while (frame) {
                var fieldPattern = this.fieldPatterns[group];
                if (!fieldPattern) {
                    if (frame.rest && frame.rest.length) {
                        if (this.fieldFormat.footer && this.fieldFormat.footer.size) {
                            frame = this.footerMatcher(frame.rest || Buffer.alloc(0));
                            message.footer = frame && frame.footer;
                        }
                        if (frame.rest && frame.rest.length) {
                            throw new Error('Not all data was parsed. Remaining ' + frame.rest.length + ' bytes at offset ' + parsedLength +
                            ' starting with 0x' + frame.rest.toString('hex') + '\r\nmessage:' + JSON.stringify(message));
                        }
                    }
                    break;
                }
                var fieldSizes = this.fieldSizes(frame['field' + bitmapField], group * 64 + 1);
                var rest = frame.rest;
                frame = fieldPattern && fieldPattern(rest, fieldSizes);
                if (!frame && fieldPattern) {
                    for (var failField = (group + 1) * 64; failField >= group * 64 + 1; failField -= 1) { // find at which field we failed by skipping fields from the end
                        fieldSizes['field' + failField + 'Size'] = 0;
                        frame = fieldPattern && fieldPattern(rest, fieldSizes);
                        if (frame && frame.rest && frame.rest.length && this.fieldFormat.footer && this.fieldFormat.footer.size) {
                            frame = this.footerMatcher(frame.rest || Buffer.alloc(0));
                            message.footer = frame && frame.footer;
                        }
                        if (frame) {
                            parsedLength += rest.length - frame.rest.length;
                            throw new Error('Parsing failed at field ' + failField + '. Remaining ' + frame.rest.length + ' bytes at offset ' + parsedLength +
                                ' starting with 0x' + frame.rest.toString('hex') + '\r\nmessage:' + JSON.stringify(message));
                        }
                    }
                    throw new Error('Parsing failed at unknown field');
                }
                parsedLength += rest.length - frame.rest.length;
                bitmapField = group * 64 + 1;
                for (var fieldNo = group * 64 + 1; fieldNo <= (group + 1) * 64; fieldNo += 1) {
                    if (fieldSizes['field' + fieldNo + 'Size']) {
                        message[fieldNo] = frame['field' + fieldNo];
                    }
                }
                group += 1;
            }
            if (message.mtid === '0800' || message.mtid === '0810') {
                $meta.opcode = String(message[70] || '');
                $meta.opcode = this.networkCodes[$meta.opcode] || $meta.opcode;
            } else {
                $meta.opcode = String(message[3] || '').substr(0, 2);
            }
            $meta.trace = `${(message.mtid || '00').substr(0, 2)}${message[11]}`;
            if (message.mtid && message.mtid.slice) {
                $meta.mtid = {
                    '0': 'request',
                    '1': (message[39] || this.successResponseIdentifier) === this.successResponseIdentifier
                        ? 'response'
                        : 'error',
                    '2': 'request',
                    '3': (message[39] || this.successResponseIdentifier) === this.successResponseIdentifier
                        ? 'response'
                        : 'error',
                    '4': 'notification',
                    '5': 'notification'
                }[(message.mtid.slice(-2).substr(0, 1))] || 'error';
            }
            $meta.method = message.mtid + ($meta.opcode ? '.' + $meta.opcode : '');
            if (message[55]) {
                try {
                    message = Object.assign({}, message, {emvTags: this.emvParser.tagsDecode(message[55], {})});
                } catch (e) {
                    $meta.mtid = 'error';
                    internalError = this.errors['iso8583.parser'];
                    message.errorStack = e;
                }
            }
            if ($meta.mtid === 'error') {
                var err = internalError || (this.errors[`iso8583.${message[39]}`] || this.errors['iso8583.generic']);
                message = err(convertError(message));
            }
            // for mac verify
            message.rawData = buffer;

            return message;
        } else {
            throw new Error('Unable to parse message type or first bitmap!');
        }
    } catch (e) {
        $meta.mtid = 'error';
        message.errorStack = e;
        message = this.errors['iso8583.parser'](convertError(message));
        return message;
    }
};

Iso8583.prototype.encodeField = function(fieldName, fieldValue) {
    var prefixBuilder = this.prefixBuilders[fieldName];
    var builder = this.fieldBuilders[fieldName];
    var fieldSize;
    if (!prefixBuilder) {
        fieldSize = this.fieldFormat[fieldName].size;
    } else if (fieldValue == null || !fieldValue.toString) {
        fieldSize = 0;
    } else if (builder && builder[0] && builder[0].binhex) {
        fieldSize = Buffer.byteLength(fieldValue, 'hex');
    } else if (builder && builder[0] && builder[0].hexbin) {
        fieldSize = Buffer.byteLength(fieldValue, 'utf-8') * 2;
    } else {
        fieldSize = fieldValue.toString().length;
    }
    var field = bitSyntax.build(builder, {
        field: fieldValue,
        fieldSize
    });
    let factor = this.fieldFormat[fieldName].prefixFactor || 1;
    return prefixBuilder ? Buffer.concat([bitSyntax.build(prefixBuilder, {'prefix': field.length * factor}), field]) : field;
};

Iso8583.prototype.encode = function(message, $meta, context, log) {
    /* jshint bitwise: false */
    var buffers = new Array(64 * this.fieldPatterns.length);
    var emptyBuffer = Buffer.alloc(0);
    if (!message[11]) {
        context.trace = context.trace || 0;
        message[11] = `${'0'.repeat(this.fieldFormat[11].size)}${context.trace}`.slice(-this.fieldFormat[11].size);
        context.trace++;
        if (context.trace >= Math.pow(10, this.fieldFormat[11].size)) {
            context.trace = 0;
        }
    }
    $meta.trace = `${(message.mtid || '00').substr(0, 2)}${message[11]}`;
    if (message.emvTags) {
        message[55] = this.emvParser.tagsEncode(message.emvTags);
    }
    var bitmaps = Array.apply(null, new Array(8 * this.fieldPatterns.length)).map(Number.prototype.valueOf, 0); // zero filled array
    for (var i = 64 * this.fieldPatterns.length; i >= 0; i -= 1) {
        if (i === 0) {
            buffers[i] = this.encodeField(i, Buffer.from(bitmaps.slice(0, 8)));
        } else if (i % 64 === 1 && i < 64 * (this.fieldPatterns.length - 1)) {
            var index = (i >> 6) << 3;
            var bitmap = bitmaps.slice(index + 8, index + 16);
            if (bitmap.reduce(function(p, n) { return p + n; })) {
                bitmaps[(i - 1) >> 3] |= (128 >> (i - 1) % 8);
                buffers[i] = this.encodeField(i, Buffer.from(bitmap));
            } else {
                buffers[i] = emptyBuffer;
            }
        } else if (message[i] != null) {
            bitmaps[(i - 1) >> 3] |= (128 >> (i - 1) % 8);
            buffers[i] = this.encodeField(i, message[i]);
        } else {
            buffers[i] = emptyBuffer;
        }
    }
    buffers.unshift(this.encodeField('mtid', message.mtid || Buffer.alloc(0)));
    if (this.fieldFormat.header && this.fieldFormat.header.size) {
        buffers.unshift(this.encodeField('header', message.header || Buffer.alloc(this.fieldFormat.header.size)));
    }
    if (this.fieldFormat.footer && this.fieldFormat.footer.size) {
        buffers.push(this.encodeField('footer', message.footer || Buffer.alloc(this.fieldFormat.footer.size)));
    }
    let buffer = Buffer.concat(buffers);
    if (log && log.trace) {
        let bufferMasked = this.encodeBufferMask(buffer, message);
        log.trace({$meta: {mtid: 'frame', method: 'iso8583.encode'}, message: bufferMasked, log: context && context.session && context.session.log});
    }
    return buffer;
};

module.exports = Iso8583;
