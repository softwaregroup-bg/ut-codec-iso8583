const tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('./config/testData')();

const ISO8583Codec = require('../index');
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
tap.test('encode message object to buffer - all fields + EMV tags', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    t.same(iso8583.encode(obj.allFieldsEMV, meta, context, log), Buffer.from(buff.allFieldsEMV, 'hex'), 'encode all fields');
    t.same(meta, obj.metaAllFieldsEMV, 'test meta object');
    t.same(context, obj.empty, 'test context object');
    t.end();
});
tap.test('encode message object to buffer - without field 11, max trace', (t) => {
    const meta = {};
    const context = {
        trace: 1000000
    };
    const log = {};
    t.same(iso8583.encode(obj.withoutField11MaxTrace, meta, context, log), Buffer.from(buff.withoutField11, 'hex'), 'encode all fields');
    t.same(meta, obj.metaWithoutField11, 'test meta object');
    t.same(context, obj.maxTrace, 'test context object');
    t.end();
});
iso8583.fieldFormat.footer = {size: 8, name: 'Footer', format: 'string'};
iso8583.fieldFormat.header = {size: 8, name: 'Header', format: 'string'};
tap.test('encode message object to buffer - all fields + header +  footer', (t) => {
    const meta = {};
    const context = {};
    const log = {};
    t.same(iso8583.encode(obj.allFields, meta, context, log), Buffer.from('00'.repeat(8) + buff.allFields + '00'.repeat(8), 'hex'), 'encode all fields');
    t.same(meta, obj.metaAllFields, 'test meta object');
    t.same(context, obj.empty, 'test context object');
    t.end();
});
