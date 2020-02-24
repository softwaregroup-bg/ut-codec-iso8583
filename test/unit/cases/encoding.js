const tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('../config/testData')();

const ISO8583Codec = require('../../../index');
const iso8583 = new ISO8583Codec(Object.assign({}, config.messageFormat, errorApi));

const obj = config.encoding.testObjects;
const buff = config.encoding.testBuffers;

tap.test('encode message object to buffer - all fields', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    t.same(iso8583.encode(obj.allFields, meta, context, log), Buffer.from(buff.allFields, 'hex'), 'encode all fields');
    t.same(meta, obj.metaAllFields, 'test meta object');
    t.same(context, obj.empty, 'test context object');
    t.end();
});
tap.test('encode message object without field 11 to buffer - test context', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    t.same(iso8583.encode(obj.withoutField11, meta, context, log), Buffer.from(buff.withoutField11, 'hex'), 'encode all fields');
    t.same(meta, obj.metaWithoutField11, 'test meta object');
    t.same(context, obj.contextWithoutField11, 'test meta object');
    t.end();
});
