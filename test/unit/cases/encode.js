//why field 35 is numeric ? Track 2 contains also non numeric characters 
var tap = require('tap');
const {define, get, fetch} = require('ut-unittest/errorApi.js')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };
const config = require('../config/test')();

const ISO8583Codec = require('../../../index')
const iso8583 = new ISO8583Codec(Object.assign({},  config.messageFormat, errorApi));

const obj = config.testObjects;
const buff = config.expectedBuffers;

tap.test('encode message object to buffer', (t) => {
    t.same(iso8583.encode(obj.messageF28,{},{},{}),Buffer.from(buff.messageF2, 'hex'));
    t.end();
});
