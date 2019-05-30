# ISO 8583 codec

## Scope

Implement encoding and decoding of ISO 8583 messages in/from buffers,
usually to be exchanged over a TCP socket.
Wikipedia has some [documentation](http://en.wikipedia.org/wiki/ISO_8583)
for the standard.

## Usage

Usually used together with ut-port-tcp, for example like this:

```js
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

In the ```format``` configuration property, the following settings are often used:

- ```size``` - specifies the format for the message size header and is
  mandatory to be specified
- ```version``` - specifies the ISO 8583 version to be used
- ```baseEncoding``` - specifies one of the 2 most common
  base encodings to use:
  ```ascii``` or ```binary```, with ```ascii``` being default
- ```fieldFormat``` - in this object, overrides for the format
  of specific fields can be specified. If not specified, a default format
  for the ```version``` and ```baseEncoding``` will be used.
  The default formats are in the file [fields.json](./fields.json)
