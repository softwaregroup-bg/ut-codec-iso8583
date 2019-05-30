function convert(msg) {
    return Object.keys(msg).reduce((prev, current) => {
        prev[(/^[^A-Za-z_]/.test(current) ? 'iso' : '') + current] = msg[current];
        return prev;
    }, {iso: msg});
}

var iterate = (defineError, errorNamespace) => (errors, collection) => Object.keys(errors).reduce((accum, name) => {
    var Err = defineError(name, errorNamespace, errors[name]);
    return {...accum, [name]: cause => Err(convert(cause))};
}, collection);

module.exports = defineError => {
    const Iso = defineError('iso8583');
    const errors0 = require('./iso0').errors;
    const errors1 = require('./iso1').errors;
    const Generic = defineError('generic', Iso, 'generic error');
    const Parser = defineError('parser', Iso, 'parser error');
    const interator = iterate(defineError, Iso);

    return interator(errors1, interator(errors0, {
        generic: cause => Generic(convert(cause)),
        parser: cause => Parser(convert(cause))
    }));
};
