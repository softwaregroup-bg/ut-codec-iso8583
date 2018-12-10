var tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('../config/testData')();

const ISO8583Codec = require('../../../index');
const iso8583 = new ISO8583Codec(Object.assign({}, config.messageFormat, errorApi));

const buffClear = config.bufferMask.clearBuffers;
const buffMasked = config.bufferMask.maskedBuffers;
const obj = config.bufferMask.objects;
tap.test('Test decodeBufferMask', (t) => {
    let tmp = iso8583.decodeBufferMask(Buffer.from(buffClear.num019pr, 'hex'), obj.num019pr);
    t.same(tmp.toString('hex'), buffMasked.num019pr, 'decodeBufferMask field 2');
    tmp = iso8583.decodeBufferMask(Buffer.from(buffClear.str016fx, 'hex'), obj.str016fx);
    t.same(tmp.toString('hex'), buffMasked.str016fx, 'decodeBufferMask field 52');
    t.end();
});

tap.test('Test encodeBufferMask', (t) => {
    let tmp = iso8583.encodeBufferMask(Buffer.from(buffClear.num019pr, 'hex'), obj.num019pr);
    t.same(tmp.toString('hex'), buffMasked.num019pr, 'encodeBufferMask field 2');
    tmp = iso8583.encodeBufferMask(Buffer.from(buffClear.str016fx, 'hex'), obj.str016fx);
    t.same(tmp.toString('hex'), buffMasked.str016fx, 'encodeBufferMask field 52');
    t.end();
});
