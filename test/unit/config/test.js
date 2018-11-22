module.exports = () => ({
    messageFormat: {
        size: '16/integer',
        //codec: require('ut-codec-iso8583'),
        version: 0,
        baseEncoding: 'ascii',
        emvTagsField: 55,
        fieldFormat: {
            '37': {format: 'string'}
        },
        networkCodes: {
            '001': 'keyChange',
            '002': 'signOff',
            '061': 'echo',
            '161': 'keyChange',
            '201': 'cutOver',
            '301': 'echo'
        },
        fieldMap: {
            pan: 2,
            evmTags: 55
        }
    },
    testObjects: {
        "messageF2": {
            'mtid': '0200',
            '2': '502265400089000092'
        },
        "messageF28": {
            'mtid': '0200',
            '28': 'D00000000'
        },

        "message": {
            '2': '502265400089000092',
            '3': '301000',
            '4': '012345678912',
            '5': '012345678912',
            '6': '012345678912',
            '7': '1024111001',// test impossible date and time ?
            '8': '01234567',
            '9': '01234567',
            '10': '01234567',
            '11': '001460',
            '12': '140956',// test impossible time ?
            '13': '1024',// test impossible date ?
            '14': '2708',// test impossible date ?
            '15': '0000',
            '16': '1811',
            '17': '1911',
            '18': '6011',
            '19': '123',
            '20': '123',
            '21': '123',
            '22': '051',
            '23': '001',
            '24': '000',
            '25': '02',
            '26': '01',
            '27': '2',
            '28': 'D00000000', // format amount ?
            '29': 'D00000001', // ?
            '30': 'D00000002', // ?
            '31': 'D00000003', // ?
            '32': '0000000058', // variable len 11 test other lengths
            '33': '0000000059', // variable len 11 test other lengths
            '34': '01234567890123456789', // variable len 28 test other lengths  
            '35': ';502265400089000092=2708620951?', // // variable len 37 test other lengths
            '36': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // // variable len 104 test other lengths
            '37': '0123456789AB',
            '38': '012abc',
            '39': '00',
            '40': '12a',
            '41': '123456ab',
            '42': '0123456789abcde',
            '43': 'SG Sofia office SofiaSTBG             PH',
            '44': '1234567890abcdefghij', // variable len 25 test other lengths
            '45': '1234567890abcdefghij', // variable len 76 test other lengths
            '46': '1234567890abcdefghij', // variable len 999 test other lengths
            '47': '1234567890abcdefghij', // variable len 999 test other lengths               
            '48': '1234567890abcdefghij', // variable len 999 test other lengths
            '49': '608', // str
            '50': '608', // str
            '51': '608', // str
            '52': '0B60C78E44D77241',
            '53': '0123456789012345',
            '54': '1234567890abcdefghij', // variable len 120 test other lengths
            '55': '1234567890abcdefghij', // variable len 999 test other lengths
            '56': '1234567890abcdefghij', // variable len 999 test other lengths
            '57': '1234567890abcdefghij', // variable len 999 test other lengths
            '58': '1234567890abcdefghij', // variable len 999 test other lengths
            '59': '1234567890abcdefghij', // variable len 999 test other lengths
            '60': '1234567890abcdefghij', // variable len 999 test other lengths
            '61': '25012000000', // variable len 999 test other lengths
            '62': '1234567890abcdefghij', // variable len 999 test other lengths
            '63': '1234567890abcdefghij', // variable len 999 test other lengths
            '64': '0123abcd', // binary
            '65': '1', // binary
            '66': '1',
            '67': '01',
            '68': '975',
            '69': '975',
            '70': '012',
            '71': '0123',
            '72': '0123',
            '73': '012345',
            '74': '0123456789',
            '75': '0123456789',
            '76': '0123456789',
            '77': '0123456789',
            '78': '0123456789',
            '79': '0123456789',
            '80': '0123456789',
            '81': '0123456789',
            '82': '012345678901',
            '83': '012345678901',
            '84': 'D00000000', // "84":   {"size": 12 , "name": "DEBITS, PROCESSING FEE AMOUNT", "format": "numeric"},
            '85': '012345678901',
            '86': '0123456789012345',
            '87': '0123456789012345',
            '88': '0123456789012345',
            '89': '0123456789012345',
            '90': '012345678901234567890123456789012345678901',
            '91': '1',// str
            '92': '1a',
            '93': '012abc',
            '94': '012abcd',
            '95': '012345678901234567890abcdefghijabcdefghijk',
            '96': '0123abcd0123abcd', // binary
            '97': '01234567890123456',
            '98': '01234567890123456789abcde',
            '99': '0123456789',// variable len 11 test other lengths
            '100': '0123456789',// variable len 11 test other lengths
            '101': 'abcdefghij',// variable len 17 test other lengths
            '102': 'abcdefghij',// variable len 28 test other lengths
            '103': 'abcdefghij',// variable len 28 test other lengths
            '104': 'abcdefghijabcdefghij',// variable len 100 test other lengths
            '105': '1234567890abcdefghij', // variable len 999 test other lengths
            '106': '1234567890abcdefghij', // variable len 999 test other lengths
            '107': '1234567890abcdefghij', // variable len 999 test other lengths
            '108': '1234567890abcdefghij', // variable len 999 test other lengths
            '109': '1234567890abcdefghij', // variable len 999 test other lengths
            '110': '1234567890abcdefghij', // variable len 999 test other lengths
            '111': '1234567890abcdefghij', // variable len 999 test other lengths
            '112': '1234567890abcdefghij', // variable len 999 test other lengths
            '113': '1234567890abcdefghij', // variable len 999 test other lengths
            '114': '1234567890abcdefghij', // variable len 999 test other lengths
            '115': '1234567890abcdefghij', // variable len 999 test other lengths
            '116': '1234567890abcdefghij', // variable len 999 test other lengths
            '117': '1234567890abcdefghij', // variable len 999 test other lengths
            '118': '1234567890abcdefghij', // variable len 999 test other lengths
            '119': '1234567890abcdefghij', // variable len 999 test other lengths
            '120': '1234567890abcdefghij', // variable len 999 test other lengths
            '121': '1234567890abcdefghij', // variable len 999 test other lengths
            '122': '1234567890abcdefghij', // variable len 999 test other lengths
            '123': '1234567890abcdefghij', // variable len 999 test other lengths
            '124': '1234567890abcdefghij', // variable len 999 test other lengths
            '125': '1234567890abcdefghij', // variable len 999 test other lengths
            '126': '1234567890abcdefghij', // variable len 999 test other lengths
            '127': '1234567890abcdefghij', // variable len 999 test other lengths
            '128': '0123abcd', // binary            
            'mtid': '0200',
            'pan': '502265400089000092',
            '_emvTags': {
                'CDOL1': {
                    'tag': '8C',
                    'len': 21,
                    'val': {
                        'amountAuthorised': {
                            'tag': '9F02',
                            'idx': 0,
                            'len': 6,
                            'val': ''
                        },
                        'amountOther': {
                            'tag': '9F03',
                            'idx': 1,
                            'len': 6,
                            'val': ''
                        },
                        'terminalCountryCode': {
                            'tag': '9F1A',
                            'idx': 2,
                            'len': 2,
                            'val': ''
                        },
                        'terminalVerificationResults': {
                            'tag': '95',
                            'idx': 3,
                            'len': 5,
                            'val': ''
                        },
                        'transactionCurrencyCode': {
                            'tag': '5F2A',
                            'idx': 4,
                            'len': 2,
                            'val': ''
                        },
                        'transactionDate': {
                            'tag': '9A',
                            'idx': 5,
                            'len': 3,
                            'val': ''
                        },
                        'transactionType': {
                            'tag': '9C',
                            'idx': 6,
                            'len': 1,
                            'val': ''
                        },
                        'unpredictableNumber': {
                            'tag': '9F37',
                            'idx': 7,
                            'len': 4,
                            'val': ''
                        }
                    }
                },
                'amountAuthorised': {
                    'tag': '9F02',
                    'len': 6,
                    'val': '000000000000'
                },
                'amountOther': {
                    'tag': '9F03',
                    'len': 6,
                    'val': '000000000000'
                },
                'applicationInterchangeProfile': {
                    'tag': '82',
                    'len': 2,
                    'val': '1800'
                },
                'pan': {
                    'tag': '5A',
                    'len': 9,
                    'val': '502265400089000092'
                },
                'panSeqNum': {
                    'tag': '5F34',
                    'len': 1,
                    'val': '01'
                },
                'atc': {
                    'tag': '9F36',
                    'len': 2,
                    'val': '0A04'
                },
                'applicationCryptogram': {
                    'tag': '9F26',
                    'len': 8,
                    'val': '54BBFA2DF6C327B7'
                },
                'cvmResults': {
                    'tag': '9F34',
                    'len': 3,
                    'val': '020000'
                },
                'cryptogramInformationData': {
                    'tag': '9F27',
                    'len': 1,
                    'val': '80'
                },
                'interfaceDeviceIFDSerialNumber': {
                    'tag': '9F1E',
                    'len': 8,
                    'val': '3030303030303031'
                },
                'issuerApplicationData': {
                    'tag': '9F10',
                    'len': 7,
                    'val': '06010A03A02000'
                },
                'terminalApplicationVersionNumber': {
                    'tag': '9F09',
                    'len': 2,
                    'val': '0096'
                },
                'terminalCapabilities': {
                    'tag': '9F33',
                    'len': 3,
                    'val': '6040E8'
                },
                'terminalCountryCode': {
                    'tag': '9F1A',
                    'len': 2,
                    'val': '0608'
                },
                'terminalType': {
                    'tag': '9F35',
                    'len': 1,
                    'val': '14'
                },
                'terminalVerificationResults': {
                    'tag': '95',
                    'len': 5,
                    'val': '8000040000'
                },
                'track2EquivalentData': ';502265400089000092=2708620951?',
                'transactionCurrencyCode': {
                    'tag': '5F2A',
                    'len': 2,
                    'val': '0608'
                },
                'applicationVersionNumber': {
                    'tag': '9F08',
                    'len': 2,
                    'val': '0096'
                },
                'transactionDate': {
                    'tag': '9A',
                    'len': 3,
                    'val': '181108'
                },
                'transactionSequenceCounter': {
                    'tag': '9F41',
                    'len': 4,
                    'val': '00003899'
                },
                'transactionStatusInformation': {
                    'tag': '9B',
                    'len': 2,
                    'val': '6000'
                },
                'transactionType': {
                    'tag': '9C',
                    'len': 1,
                    'val': '30'
                },
                'unpredictableNumber': {
                    'tag': '9F37',
                    'len': 4,
                    'val': 'C3A7952E'
                },
                '9F53': {
                    'tag': '9F53',
                    'len': 1,
                    'val': '5A'
                },
                'applicationIdentifierAIDTerminal': {
                    'tag': '9F06',
                    'len': 7,
                    'val': 'A0000006351010'
                },
                'applicationLabel': {
                    'tag': '50',
                    'len': 16,
                    'val': '5068696C697070696E65204465626974'
                },
                'cardholderName': {
                    'tag': '5F20',
                    'len': 26,
                    'val': '4544204241524741444F2F202020202020202020202020202020'
                },
                'applicationExpirationDate': {
                    'tag': '5F24',
                    'len': 3,
                    'val': '270831'
                }
            }
        }
    },
    expectedBuffers: {
        messageF2 : '30323030343032303030303030303030303030303138353032323635343030303839303030303932303030303030'
    }
});