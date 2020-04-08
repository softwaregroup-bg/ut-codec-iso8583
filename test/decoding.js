const tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('./config/testData')();

const ISO8583Codec = require('../index');
const iso8583 = new ISO8583Codec(Object.assign({}, config.messageFormat, errorApi));

const obj = config.decoding.testObjects;
const buff = config.decoding.testBuffers;
tap.test('decode correct buffer to message object', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffCorrect, 'hex'), meta, context, log);
    t.same(objDecode, obj.messageCorrect, 'test message object');
    t.same(meta, obj.metaCorrect, 'test meta object');
    t.same(context, obj.empty, 'test context object');
    t.end();
});
tap.test('decode buffer with wrong frame', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffWrongFrame, 'hex'), meta, context, log);
    t.match(objDecode, obj.messageParserError, 'test message object');
    t.match(meta, obj.metaError, 'test meta object');
    t.end();
});
tap.test('decode buffer with extra bytes', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffExtralong, 'hex'), meta, context, log);
    t.match(objDecode, obj.messageParserError, 'test message object');
    t.match(meta, obj.metaError, 'test meta object');
    t.end();
});
tap.test('decode buffer with wrong field', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffWrongField, 'ascii'), meta, context, log);
    t.match(objDecode, obj.messageParserError, 'test message object');
    t.match(meta, obj.metaError, 'test meta object');
    t.end();
});
tap.test('decode buffer ISO field 39 error', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffISOError, 'hex'), meta, context, log);
    t.match(objDecode, obj.messageGenericError15, 'test message object');
    t.match(meta, obj.metaErrorGeneric, 'test meta object');
    t.end();
});
tap.test('decode buffer with MTI 0800', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    const objDecode = iso8583.decode(Buffer.from(buff.buffMTI0800, 'hex'), meta, context, log);
    t.match(objDecode, obj.messageMTI0800, 'test message object');
    t.match(meta, obj.metaMTI0800, 'test meta object');
    t.end();
});
