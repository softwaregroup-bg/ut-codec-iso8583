# ISO 8583 codec

## Scope

Implement encoding and decoding of ISO 8583 messages from/to buffers, usually
 to be exchanged over a TCP socket. Wikipedia has some
 [documentation](http://en.wikipedia.org/wiki/ISO_8583) for the standard.

## Usage

Usually used together with ut-port-tcp, for example like this:

```javascript
module.exports = {
    createPort: require('ut-port-tcp'),
    format: {
        size: '16/integer',
        codec: require('ut-codec-iso8583'),
        version: 0,
        baseEncoding: 'ascii',
        fieldFormat: {
            '37': {format: 'numeric'}
        }
    }
}
```

In the _format_ configuration property, the following settings are often used:

- _size_ - specifies the format for the message size header and is mandatory
  to be specified
- _version_ - specifies the ISO 8583 version to be used
- _baseEncoding_ - specifies one of the 2 most common base encodings to use:
 _ascii_ or _binary_, with _ascii_ being default
- _fieldFormat_ - in this object, overrides for the format of specific fields
  can be specified. If not specified, a default format for the _version_ and
   _baseEncoding_ will be used. The default formats are in the file
   [fields.json](./fields.json)

## Public API

The module exposes _Iso8583_ class.

### fieldSizes

(bitmap, start)

params

- _bitmap_ (buffer) - ISO8583 bitmap
- _start_ ()

result (object) - each _key: value_ pair contains the following:

- _key_ - field number, presented as _field_<_field number_>_Size_
- _value_ (integer) - field size

### decode

(buffer, $meta, context, log)

Decodes ISO8583 format message to object

params

- _buffer_ (buffer) - ISO8583 encoded message
- _$meta_ (object) - meta object as defined in ???
- _context_ (object) - context object as defined in ???
- _log_ (object) - log functions as defined in _ut-log_

result (object)

- _header_ (string) - message header
- _mtid_ (string) - message type indicator according to ISO8583 specifications
- rawData
- _0_ (string) - first bitmap
- _1_ (string) - second bitmap
- __rest__ - depending on data elements _0_ and _1_ contain ISO8583 data
 elements as _key: value_ pairs as follows:
  - _key_ - ISO8583 element index
  - _value_ (string) - ISO8583 element value

### encodeField

(fieldName, fieldValue)

Encodes string to ISO8583 format

params

  - _fieldName_ (integer) - ISO8583 element index
  - _fieldValue_ (string) - ISO8583 element value

result (buffer) - ISO8583 encoded _fieldValue_

### encode

(message, $meta, context, log)

Encodes message object to ISO8583 format

params

- _message_ (object) - each _key: value_ pair contains the following:
  - _key_ - ISO8583 element index
  - _value_ (string) - ISO8583 element value
- _$meta_ (object) - meta object as defined in ???
- _context_ (object) - context object as defined in ???
- _log_ (object) - log functions as defined in _ut-log_

result (buffer) - ISO8583 encoded _message_

## Private API

### convertError

(msg)

Converts ISO8583 message if it contains an error

params

- _msg_ (object) - ISO8583 message
  - _errorStack_ (object) - stack of an error message
    - _message_ (string) - error message
    - _stack_ (string) - error stack
  - _header_ (string) - message header
  - _mtid_ (string) - message type indicator according to ISO8583 specifications
  - _0_ (string) - first bitmap
  - _1_ (string) - second bitmap
  - __rest__ - depending on data elements _0_ and _1_ contain ISO8583 data
   elements as _key: value_ pairs as follows:
    - _key_ - ISO8583 element index
    - _value_ (string) - ISO8583 element value

result (object)

- _errorStack_ (object) - same as in _params_
- _header_ (string) - same as in _params_
- _iso_ (object) - contains the original params _msg_
- _mtid_ (string) - same as in _params_
- _iso0_ (string) - same as _0_ in _params_
- _iso1_ (string) - same as _1_ in _params_
- __rest__ - all other ISO8583 data elements from _params_ presented as _key:
 value_ pairs as follows:
    - _key_ - ISO8583 element index; **Note: _key_ is the original _key_ from
     _params_ with prepended _iso_**
    - _value_ (string) - ISO8583 element value

### getFormat

(format, fallback)

Returns _ut-bitsyntax_ format based on input data type

params

- _format_ (string) - data type; __Valid values__: _numeric_, _string_,
 _amount_, _bcdamount_
- _fallback_ (string) - data type to be used in case _format_ is not available

result

- (string) - _ut-bitsyntax_ format

### getMaskList

(arr, objArr)

Returns array of strings to be masked in ISO8583 message

params

- _arr_ (array) - array of ISO8583 data elements' indexes
- _objArr_ (object) - ISO8583 message; each _key: value_ contains the
 following:
  - _key_ - ISO8583 element index
  - _value_ (string) - ISO8583 element value

result

- (array) - array of strings from the ISO8583 message to be masked with _*_

### decodeBufferMask

(maskFields)(buffer, messageParsed)

Masks some of the ISO8583 data elements in ISO8583 encoded message

params

- _maskFields_ (array) - array of ISO8583 data elements' indexes to be masked
- _buffer_ (buffer) - ISO8583 message
- _messageParsed_ (object) - ISO8583 message; each _key: value_ contains the
 following:
  - _key_ - ISO8583 element index
  - _value_ (string) - ISO8583 element value

result

- (buffer) - _buffer_ with masked values for ISO8583 data elements contained in
 _maskFields_

### encodeBufferMask

(maskFields)(buffer, message)

Masks some of the ISO8583 data elements in ISO8583 encoded message

params

- _maskFields_ (array) - array of ISO8583 data elements' indexes to be masked
- _buffer_ (buffer) - ISO8583 message
- _message_ (object) - ISO8583 message; each _key: value_ contains the
 following:
  - _key_ - ISO8583 element index
  - _value_ (string) - ISO8583 element value

result

- (buffer) - _buffer_ with masked values for ISO8583 data elements contained in
 _maskFields_

## Field format definition

Each ISO8583 field is defined in the following object:

- _key_ - ISO8583 element index, including _header_, _footer_, _mtid_ and first
 bitmap _0_
- _value_ (object) - data element definition
  - _size_ (integer) - size of the data element value in number of symbols
  - _name_ (string) - descriptive field name
  - _format_ (string) - data format of the value
  - _prefixSize_ (integer) - number of symbols indicating the _size_ of the
   variable length data elements; **NOTE: available only for (and also
   indicating) variable length data elements**

## Configuration

- _defineError_ (function) - defineError function as defined in _ut-error_
- _getError_ (function) - getError function as defined in _ut-error_
- _fetchErrors_ (function) - fetchErrors function as defined in _ut-error_
- _maskFields_ (array) - contains ISO8583 element indexes which will be masked
 in ISO8583 encoded messages
- _networkCodes_ () - ???
- _emvParser_ () - ???
- _successResponseIdentifier_ (string) - error code for successful processing
 (no-error code)
- _version_ (string) - ISO8583 version; __Valid values__: _0_ (1987), _1_
 (1993), _2_ (2003)
- _baseEncoding_ (string) - ISO8583 message encoding; __Valid values__:
 _ascii_, _binary_
- _fieldFormat_ (object) - ISO8583 field format definition to overwrite the
 default format; **NOTE: for more information please check _Field format
 definition_ above**
