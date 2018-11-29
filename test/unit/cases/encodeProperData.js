var tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('../config/testProperData')();

const ISO8583Codec = require('../../../index');
const iso8583 = new ISO8583Codec(Object.assign({}, config.messageFormat, errorApi));

const obj = config.testObjects;
const buff = config.expectedBuffers;

tap.test('encode message object to buffer', (t) => {
    t.same(iso8583.encode(obj.bin001fx, {}, {}, {}), Buffer.from(buff.bin001fx, 'hex'), 'fixed size 1 format binary ???');
    t.same(iso8583.encode(obj.num001fx, {}, {}, {}), Buffer.from(buff.num001fx, 'hex'), 'fixed size 1 format numeric');
    t.same(iso8583.encode(obj.str001fx, {}, {}, {}), Buffer.from(buff.str001fx, 'hex'), 'fixed size 1 format string');
    t.same(iso8583.encode(obj.num002fx, {}, {}, {}), Buffer.from(buff.num002fx, 'hex'), 'fixed size 2 format numeric');
    t.same(iso8583.encode(obj.str002fx, {}, {}, {}), Buffer.from(buff.str002fx, 'hex'), 'fixed size 2 format string');
    t.same(iso8583.encode(obj.num003fx, {}, {}, {}), Buffer.from(buff.num003fx, 'hex'), 'fixed size 3 format numeric');
    t.same(iso8583.encode(obj.str003fx, {}, {}, {}), Buffer.from(buff.str003fx, 'hex'), 'fixed size 3 format string');
    t.same(iso8583.encode(obj.num004fx, {}, {}, {}), Buffer.from(buff.num004fx, 'hex'), 'fixed size 4 format numeric');
    t.same(iso8583.encode(obj.num006fx, {}, {}, {}), Buffer.from(buff.num006fx, 'hex'), 'fixed size 6 format numeric');
    t.same(iso8583.encode(obj.str006fx, {}, {}, {}), Buffer.from(buff.str006fx, 'hex'), 'fixed size 6 format string');
    t.same(iso8583.encode(obj.str007fx, {}, {}, {}), Buffer.from(buff.str007fx, 'hex'), 'fixed size 7 format string');
    t.same(iso8583.encode(obj.bin008fx, {}, {}, {}), Buffer.from(buff.bin008fx, 'hex'), 'fixed size 8 format binary ???');
    t.same(iso8583.encode(obj.num008fx, {}, {}, {}), Buffer.from(buff.num008fx, 'hex'), 'fixed size 8 format numeric');
    t.same(iso8583.encode(obj.str008fx, {}, {}, {}), Buffer.from(buff.str008fx, 'hex'), 'fixed size 8 format string');
    t.same(iso8583.encode(obj.amt009fx, {}, {}, {}), Buffer.from(buff.amt009fx, 'hex'), 'fixed size 9 format amount ???');
    t.same(iso8583.encode(obj.num010fx, {}, {}, {}), Buffer.from(buff.num010fx, 'hex'), 'fixed size 10 format numeric');
    t.same(iso8583.encode(obj.num011pr, {}, {}, {}), Buffer.from(buff.num011pr, 'hex'), 'variable size up to 11 format numeric');
    t.same(iso8583.encode(obj.num012fx, {}, {}, {}), Buffer.from(buff.num012fx, 'hex'), 'fixed size 12 format numeric');
    t.same(iso8583.encode(obj.str012fx, {}, {}, {}), Buffer.from(buff.str012fx, 'hex'), 'fixed size 12 format string');
    t.same(iso8583.encode(obj.str015fx, {}, {}, {}), Buffer.from(buff.str015fx, 'hex'), 'fixed size 15 format string');
    t.same(iso8583.encode(obj.bin016fx, {}, {}, {}), Buffer.from(buff.bin016fx, 'hex'), 'fixed size 16 format binary ???');
    t.same(iso8583.encode(obj.num016fx, {}, {}, {}), Buffer.from(buff.num016fx, 'hex'), 'fixed size 16 format numeric');
    t.same(iso8583.encode(obj.str016fx, {}, {}, {}), Buffer.from(buff.str016fx, 'hex'), 'fixed size 16 format string');
    t.same(iso8583.encode(obj.str017pr, {}, {}, {}), Buffer.from(buff.str017pr, 'hex'), 'variable size up to 17 format string');
    t.same(iso8583.encode(obj.amt017fx, {}, {}, {}), Buffer.from(buff.amt017fx, 'hex'), 'fixed size 17 format amount');
    t.same(iso8583.encode(obj.num019pr, {}, {}, {}), Buffer.from(buff.num019pr, 'hex'), 'variable size up to 19 format numeric');
    t.same(iso8583.encode(obj.str025fx, {}, {}, {}), Buffer.from(buff.str025fx, 'hex'), 'fixed size 25 format string');
    t.same(iso8583.encode(obj.str025pr, {}, {}, {}), Buffer.from(buff.str025pr, 'hex'), 'variable size up to 25 format string');
    t.same(iso8583.encode(obj.str028pr, {}, {}, {}), Buffer.from(buff.str028pr, 'hex'), 'variable size up to 28 format string');
    t.same(iso8583.encode(obj.num037pr, {}, {}, {}), Buffer.from(buff.num037pr, 'hex'), 'variable size up to 37 format numeric');
    t.same(iso8583.encode(obj.str040fx, {}, {}, {}), Buffer.from(buff.str040fx, 'hex'), 'fixed size 40 format string');
    t.same(iso8583.encode(obj.num042fx, {}, {}, {}), Buffer.from(buff.num042fx, 'hex'), 'fixed size 42 format numeric');
    t.same(iso8583.encode(obj.str042fx, {}, {}, {}), Buffer.from(buff.str042fx, 'hex'), 'fixed size 42 format string');
    t.same(iso8583.encode(obj.str076pr, {}, {}, {}), Buffer.from(buff.str076pr, 'hex'), 'variable size up to 76 format string');
    t.same(iso8583.encode(obj.str100pr, {}, {}, {}), Buffer.from(buff.str100pr, 'hex'), 'variable size up to 100 format string');
    t.same(iso8583.encode(obj.str104pr, {}, {}, {}), Buffer.from(buff.str104pr, 'hex'), 'variable size up to 104 format string');
    t.same(iso8583.encode(obj.str120pr, {}, {}, {}), Buffer.from(buff.str120pr, 'hex'), 'variable size up to 120 format string');
    t.same(iso8583.encode(obj.str999pr, {}, {}, {}), Buffer.from(buff.str999pr, 'hex'), 'variable size up to 999 format string');
    t.same(iso8583.encode(obj.allFields, {}, {}, {}), Buffer.from(buff.allFields, 'hex'), 'encode all fields');

    t.end();
});
