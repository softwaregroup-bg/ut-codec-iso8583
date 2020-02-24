const testData = {
    bin001fx: '01',
    num001fx: '9',
    str001fx: 'Z',
    num002fx: '98',
    str002fx: 'ZY',
    num003fx: '987',
    str003fx: 'ZYX',
    num004fx: '9876',
    num006fx: '987654',
    str006fx: 'ZYXWVU',
    str007fx: 'ZYXWVUT',
    bin008fx: '1A2B3C4D',
    num008fx: '98765432',
    str008fx: 'ZYXWVUTS',
    amt009fx: 'D98765432',
    num010fx: '9876543210',
    num011pr: '987654',
    num012fx: '987654321098',
    str012fx: 'ZYXWVUTSRQPO',
    str015fx: 'ZYXWVUTSRQPONML',
    bin016fx: '1A2B3C4D5E6FA1B2',
    num016fx: '9876543210987654',
    str016fx: 'ZYXWVUTSRQPONMLK',
    str017pr: 'ZYXWVUTSR',
    amt017fx: 'D9876543210987654',
    num019pr: '9876543210',
    str025fx: 'ZYXWVUTSRQPONMLKJIHGFEDCB',
    str025pr: 'ZYXWVUTSRQPON',
    str028pr: 'ZYXWVUTSRQPONM',
    num037pr: '9876543210987654321',
    str040fx: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-',
    num042fx: '987654321098765432109876543210987654321098',
    str042fx: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZY',
    str076pr: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=',
    str100pr: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZYXWVUTSRQ',
    str104pr: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZYXWVUTSRQPO',
    str120pr: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZYXWVUTSRQPONMLKJIHG',
    str999pr: 'ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210?=+-ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210'
};

module.exports = () => ({
    messageFormat: {
        size: '16/integer',
        version: 0,
        baseEncoding: 'ascii',
        emvTagsField: 55,
        fieldFormat: {
            37: {format: 'string'}
        },
        networkCodes: {
            '001': 'keyChange',
            '002': 'signOff',
            '061': 'echo',
            161: 'keyChange',
            201: 'cutOver',
            301: 'echo'
        },
        fieldMap: {
            pan: 2,
            evmTags: 55
        }
    },
    bitmaps: {
        testObjects: {
            bmp1: {3: '', 13: '', 23: '', 33: '', 43: '', 53: '', 63: ''},
            bmp1and2: {2: '', 12: '', 22: '', 32: '', 42: '', 52: '', 62: '', 72: '', 82: '', 92: '', 102: '', 112: '', 122: ''},
            bmpFull: {2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '', 11: '', 12: '', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '', 20: '', 21: '', 22: '', 23: '', 24: '', 25: '', 26: '', 27: '', 28: '', 29: '', 30: '', 31: '', 32: '', 33: '', 34: '', 35: '', 36: '', 37: '', 38: '', 39: '', 40: '', 41: '', 42: '', 43: '', 44: '', 45: '', 46: '', 47: '', 48: '', 49: '', 50: '', 51: '', 52: '', 53: '', 54: '', 55: '', 56: '', 57: '', 58: '', 59: '', 60: '', 61: '', 62: '', 63: '', 64: Buffer.from('00', 'hex'), 65: Buffer.from('00', 'hex'), 66: '', 67: '', 68: '', 69: '', 70: '', 71: '', 72: '', 73: '', 74: '', 75: '', 76: '', 77: '', 78: '', 79: '', 80: '', 81: '', 82: '', 83: '', 84: '', 85: '', 86: '', 87: '', 88: '', 89: '', 90: '', 91: '', 92: '', 93: '', 94: '', 95: '', 96: Buffer.from('00', 'hex'), 97: '', 98: '', 99: '', 100: '', 101: '', 102: '', 103: '', 104: '', 105: '', 106: '', 107: '', 108: '', 109: '', 110: '', 111: '', 112: '', 113: '', 114: '', 115: '', 116: '', 117: '', 118: '', 119: '', 120: '', 121: '', 122: '', 123: '', 124: '', 125: '', 126: '', 127: '', 128: Buffer.from('00', 'hex')},
            bmpEmpty: {}
        },
        testBuffers: {
            bmp1: '2028020080200802',
            bmp1and2: 'C0300401004010040100401004010040',
            bmpFull: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            bmpEmptyDefault: '0020000000000000',
            bmpEmpty: '0000000000000000',
            bmp1msg: '30323030323032383032303038303230303830323030303030303030303030303030303030303030302020202020202020202020202020202020202020202020202020202020202020202020202020202030303030303030303030303030303030303030',
            bmp1and2msg: '30323030433033303034303130303430313030343031303034303130303430313030343030303030303030303030303030303030303030202020202020202020202020202020202020202020202020202020202020203030303030303030303030303030303030303020203030303030303030',
            bmpFullmsg: '30323030464646464646464646464646464646464646464646464646464646464646464630303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202030303030303030303030303030202020202020202020202020202020202020202020202020203030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303000000000000000000030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030302020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202000000000000000000000000000000000303030303030303030303030303030303020202020202020202020202020202020202020202020202020303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030300000000000000000',
            bmpEmptymsg: '3032303030303030303030303030303030303030'
        }
    },
    bufferMask: {
        clearBuffers: {
            num019pr: '3032303034303230303030303030303030303030313039383736353433323130303030303030',
            str016fx: '30323030303032303030303030303030313030303030303030305a595857565554535251504f4e4d4c4b'
        },
        maskedBuffers: {
            num019pr: '303230303430323030303030303030303030303031302a2a2a2a2a2a2a2a2a2a303030303030',
            str016fx: '30323030303032303030303030303030313030303030303030305a595857565554535251504f4e4d4c4b'
        },
        objects: {
            num019pr: {
                mtid: '0200',
                2: testData.num019pr
            },
            str016fx: {
                mtid: '0200',
                52: testData.str016fx
            }
        }
    },
    decoding: {
        testBuffers: {
            buffCorrect: '3032303046413345343739313238413044303038303030303130303030303030303030303130393837363534333231303938373635343938373635343332313039383938373635343332313039383938373635343332313039383736353439383736353439383736393837363938373639383736393837393837393837393844393837363534333230363938373635343139393837363534333231303938373635343332315a595857565554535251504f5a595857565554535a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a59585a59585a595857565554535251504f4e4d4c4b3131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a49484746454443424139383736353433323130393837363534333231303938',
            buffWrongFrame: '00',
            buffExtralong: '3032303046413345343739313238413044303038303030303130303030303030303030303130393837363534333231303938373635343938373635343332313039383938373635343332313039383938373635343332313039383736353439383736353439383736393837363938373639383736393837393837393837393844393837363534333230363938373635343139393837363534333231303938373635343332315a595857565554535251504f5a595857565554535a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a59585a59585a595857565554535251504f4e4d4c4b3034305a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d393837363534333231303938303030',
            buffWrongField: '303230304641334534373931323841304430303830303030313030303030303030303030313039383736353433323130393837363534393837363534333231303938303938373635343332313039383938373635343332313039383736353439383736353439383736393837363938373639383736393837393837393837393844393837363534333230363938373635343139393837363534333231303938373635343332315a595857565554535251504f5a595857565554535a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a59585a59585a595857565554535251504f4e4d4c4b3034305a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d393837363534333231303938303030',
            buffISOError: '3032313045303230303030303032303030303030303430303030303030303030303030303130393837363534333231303938373635343938373635343135393837',
            buffMTI0800: '3038303045303230303030303032303030303030303430303030303030303030303030303130393837363534333231303938373635343938373635343135313631'
        },
        testObjects: {
            empty: {
            },
            messageCorrect: {
                header: '',
                mtid: '0200',
                0: Buffer.from('FA3E479128A0D008', 'hex'),
                1: Buffer.from('0000100000000000', 'hex'),
                2: testData.num019pr,
                3: testData.num006fx,
                4: testData.num012fx,
                5: testData.num012fx,
                7: testData.num010fx,
                11: testData.num006fx,
                12: testData.num006fx,
                13: testData.num004fx,
                14: testData.num004fx,
                15: testData.num004fx,
                18: testData.num004fx,
                22: testData.num003fx,
                23: testData.num003fx,
                24: testData.num003fx,
                25: testData.num002fx,
                28: testData.amt009fx,
                32: testData.num011pr,
                35: testData.num037pr,
                37: testData.str012fx,
                41: testData.str008fx,
                43: testData.str040fx,
                49: testData.str003fx,
                50: testData.str003fx,
                52: testData.str016fx,
                61: testData.str999pr,
                84: testData.num012fx,
                rawData: Buffer.from('3032303046413345343739313238413044303038303030303130303030303030303030303130393837363534333231303938373635343938373635343332313039383938373635343332313039383938373635343332313039383736353439383736353439383736393837363938373639383736393837393837393837393844393837363534333230363938373635343139393837363534333231303938373635343332315a595857565554535251504f5a595857565554535a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a59585a59585a595857565554535251504f4e4d4c4b3131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a49484746454443424139383736353433323130393837363534333231303938', 'hex')
            },
            messageISOError: {
                header: '',
                mtid: '0210',
                0: Buffer.from('E020000002000000', 'hex'),
                1: Buffer.from('0400000000000000', 'hex'),
                2: testData.num019pr,
                3: testData.num006fx,
                11: testData.num006fx,
                39: '15',
                70: testData.num003fx
            },
            messageMTI0800: {
                header: '',
                mtid: '0800',
                0: Buffer.from('E020000002000000', 'hex'),
                1: Buffer.from('0400000000000000', 'hex'),
                2: testData.num019pr,
                3: testData.num006fx,
                11: testData.num006fx,
                39: '15',
                70: 161
            },
            messageParserError: {
                name: 'Error',
                message: 'Parser error',
                type: 'iso8583.parser'
            },
            messageGenericError15: {
                name: 'Error',
                message: 'No such issuer',
                type: 'iso8583.15'
            },
            metaCorrect: {
                method: '0200.98',
                mtid: 'request',
                opcode: '98',
                trace: '02987654'
            },
            metaError: {
                mtid: 'error'
            },
            metaErrorGeneric: {
                method: '0210.98',
                mtid: 'error',
                opcode: '98',
                trace: '02987654'
            },
            metaMTI0800: {
                method: '0800.keyChange',
                mtid: 'request',
                opcode: 'keyChange',
                trace: '08987654'
            }
        }
    },
    encoding: {
        testBuffers: {
            allFields: '3032303046464646464646464646464646464646464646464646464646464646464646463130393837363534333231303938373635343938373635343332313039383938373635343332313039383938373635343332313039383938373635343332313039383736353433323938373635343332393837363534333239383736353439383736353439383736393837363938373639383736393837363938373639383739383739383739383739383739383739383938394439383736353433324439383736353433324439383736353433324439383736353433323036393837363534303639383736353431345a595857565554535251504f4e4d3139393837363534333231303938373635343332313035325a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f5a595857565554535251504f5a59585756555a595a59585a595857565554535a595857565554535251504f4e4d4c5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d31335a595857565554535251504f4e33385a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d3131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231305a59585a59585a59585a595857565554535251504f4e4d4c4b393837363534333231303938373635343036305a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a4948473131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231301a2b3c4d000000000139393839383739383739383739383736393837363938373635343938373635343332313039383736353433323130393837363534333231303938373635343332313039383736353433323130393837363534333231303938373635343332313039383736353433323130393837363534333231303938393837363534333231303938393837363534333231303938393837363534333231303938393837363534333231303938373635343938373635343332313039383736353439383736353433323130393837363534393837363534333231303938373635343938373635343332313039383736353433323130393837363534333231303938373635343332313039385a5a595a59585756555a5958575655545a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a591a2b3c4d5e6fa1b2000000000000000044393837363534333231303938373635345a595857565554535251504f4e4d4c4b4a49484746454443423036393837363534303639383736353430395a595857565554535231345a595857565554535251504f4e4d31345a595857565554535251504f4e4d3035305a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a5958575655545352513131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231301a2b3c4d00000000',
            withoutField11: '3032303046413345343739313238413044303038303030303130303030303030303030303130393837363534333231303938373635343938373635343332313039383938373635343332313039383938373635343332313030303030303039383736353439383736393837363938373639383736393837393837393837393844393837363534333230363938373635343139393837363534333231303938373635343332315a595857565554535251504f5a595857565554535a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a59585a59585a595857565554535251504f4e4d4c4b3131365a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a494847464544434241393837363534333231303f3d2b2d5a595857565554535251504f4e4d4c4b4a49484746454443424139383736353433323130393837363534333231303938'
        },
        testObjects: {
            allFields: {
                mtid: '0200',
                2: testData.num019pr,
                3: testData.num006fx,
                4: testData.num012fx,
                5: testData.num012fx,
                6: testData.num012fx,
                7: testData.num010fx,
                8: testData.num008fx,
                9: testData.num008fx,
                10: testData.num008fx,
                11: testData.num006fx,
                12: testData.num006fx,
                13: testData.num004fx,
                14: testData.num004fx,
                15: testData.num004fx,
                16: testData.num004fx,
                17: testData.num004fx,
                18: testData.num004fx,
                19: testData.num003fx,
                20: testData.num003fx,
                21: testData.num003fx,
                22: testData.num003fx,
                23: testData.num003fx,
                24: testData.num003fx,
                25: testData.num002fx,
                26: testData.num002fx,
                27: testData.num001fx,
                28: testData.amt009fx,
                29: testData.amt009fx,
                30: testData.amt009fx,
                31: testData.amt009fx,
                32: testData.num011pr,
                33: testData.num011pr,
                34: testData.str028pr,
                35: testData.num037pr,
                36: testData.str104pr,
                37: testData.str012fx,
                38: testData.str006fx,
                39: testData.str002fx,
                40: testData.str003fx,
                41: testData.str008fx,
                42: testData.str015fx,
                43: testData.str040fx,
                44: testData.str025pr,
                45: testData.str076pr,
                46: testData.str999pr,
                47: testData.str999pr,
                48: testData.str999pr,
                49: testData.str003fx,
                50: testData.str003fx,
                51: testData.str003fx,
                52: testData.str016fx, // why string? Shouldn't pin be bin?
                53: testData.num016fx,
                54: testData.str120pr,
                55: testData.str999pr,
                56: testData.str999pr,
                57: testData.str999pr,
                58: testData.str999pr,
                59: testData.str999pr,
                60: testData.str999pr,
                61: testData.str999pr,
                62: testData.str999pr,
                63: testData.str999pr,
                64: Buffer.from(testData.bin008fx, 'hex'),
                65: Buffer.from(testData.bin001fx, 'hex'),
                66: testData.num001fx,
                67: testData.num002fx,
                68: testData.num003fx,
                69: testData.num003fx,
                70: testData.num003fx,
                71: testData.num004fx,
                72: testData.num004fx,
                73: testData.num006fx,
                74: testData.num010fx,
                75: testData.num010fx,
                76: testData.num010fx,
                77: testData.num010fx,
                78: testData.num010fx,
                79: testData.num010fx,
                80: testData.num010fx,
                81: testData.num010fx,
                82: testData.num012fx,
                83: testData.num012fx,
                84: testData.num012fx,
                85: testData.num012fx,
                86: testData.num016fx,
                87: testData.num016fx,
                88: testData.num016fx,
                89: testData.num016fx,
                90: testData.num042fx,
                91: testData.str001fx,
                92: testData.str002fx,
                93: testData.str006fx,
                94: testData.str007fx,
                95: testData.str042fx,
                96: Buffer.from(testData.bin016fx, 'hex'),
                97: testData.amt017fx,
                98: testData.str025fx,
                99: testData.num011pr,
                100: testData.num011pr,
                101: testData.str017pr,
                102: testData.str028pr,
                103: testData.str028pr,
                104: testData.str100pr,
                105: testData.str999pr,
                106: testData.str999pr,
                107: testData.str999pr,
                108: testData.str999pr,
                109: testData.str999pr,
                110: testData.str999pr,
                111: testData.str999pr,
                112: testData.str999pr,
                113: testData.str999pr,
                114: testData.str999pr,
                115: testData.str999pr,
                116: testData.str999pr,
                117: testData.str999pr,
                118: testData.str999pr,
                119: testData.str999pr,
                120: testData.str999pr,
                121: testData.str999pr,
                122: testData.str999pr,
                123: testData.str999pr,
                124: testData.str999pr,
                125: testData.str999pr,
                126: testData.str999pr,
                127: testData.str999pr,
                128: Buffer.from(testData.bin008fx, 'hex')
            },
            metaAllFields: {
                trace: '02987654'
            },
            empty: {
            },
            withoutField11: {
                mtid: '0200',
                2: testData.num019pr,
                3: testData.num006fx,
                4: testData.num012fx,
                5: testData.num012fx,
                7: testData.num010fx,
                12: testData.num006fx,
                13: testData.num004fx,
                14: testData.num004fx,
                15: testData.num004fx,
                18: testData.num004fx,
                22: testData.num003fx,
                23: testData.num003fx,
                24: testData.num003fx,
                25: testData.num002fx,
                28: testData.amt009fx,
                32: testData.num011pr,
                35: testData.num037pr,
                37: testData.str012fx,
                41: testData.str008fx,
                43: testData.str040fx,
                49: testData.str003fx,
                50: testData.str003fx,
                52: testData.str016fx,
                61: testData.str999pr,
                84: testData.num012fx
            },
            metaWithoutField11: {
                trace: '02000000'
            },
            contextWithoutField11: {
                trace: 1
            }
        }
    }

});
