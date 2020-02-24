const tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('../config/testData')();

const ISO8583Codec = require('../../../index');
const iso8583 = new ISO8583Codec(Object.assign({}, config.messageFormat, errorApi));

const obj = config.bitmaps.testObjects;
const buff = config.bitmaps.testBuffers;

tap.test('Test bitmaps generation and encoding', (t) => {
    t.same(iso8583.encode(obj.bmp1, {}, {}, {}).toString('ascii').slice(4, 20), buff.bmp1, 'Encoding of bitmap 1');
    t.same(iso8583.encode(obj.bmp1and2, {}, {}, {}).toString('ascii').slice(4, 36), buff.bmp1and2, 'Encoding of bitmap 1 and 2');
    t.same(iso8583.encode(obj.bmpFull, {}, {}, {}).toString('ascii').slice(4, 36), buff.bmpFull, 'Encoding of bitmap 1 and 2 with all fields');
    t.same(iso8583.encode(obj.bmpEmpty, {}, {}, {}).toString('ascii').slice(4, 20), buff.bmpEmptyDefault, 'Encoding of bitmap with no fields');
    t.end();
});
tap.test('Test bitmaps decoding', (t) => {
    let tmp = iso8583.decode(Buffer.from(buff.bmp1msg, 'hex'), {}, {}, {});
    t.same(tmp[0].toString('hex'), buff.bmp1, 'Decoding of bitmap 1');
    tmp = iso8583.decode(Buffer.from(buff.bmp1and2msg, 'hex'), {}, {}, {});
    t.same(tmp[0].toString('hex') + tmp[1].toString('hex'), buff.bmp1and2.toLocaleLowerCase(), 'Decoding of bitmap 1 and 2');
    tmp = iso8583.decode(Buffer.from(buff.bmpFullmsg, 'hex'), {}, {}, {});
    t.same(tmp[0].toString('hex') + tmp[1].toString('hex'), buff.bmpFull.toLocaleLowerCase(), 'Decoding of bitmap 1 and 2 with all fields');
    tmp = iso8583.decode(Buffer.from(buff.bmpEmptymsg, 'hex'), {}, {}, {});
    t.same(tmp[0].toString('hex'), buff.bmpEmpty, 'Decoding of bitmap with no fields');
    t.end();
});
