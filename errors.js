function convert(msg) {
    return Object.keys(msg).reduce((prev, current) => {
        prev[(/^[^A-Za-z_]/.test(current) ? 'iso' : '') + current] = msg[current];
        return prev;
    }, {iso: msg});
}

module.exports = defineError => {
    const Iso = defineError('iso8583');
    const errors0 = require('./iso0').errors;
    const errors1 = require('./iso1').errors;
    const Generic = defineError('generic', Iso, 'generic error');
    const Parser = defineError('parser', Iso, 'parser error');
    let result = {
        generic: cause => Generic(convert(cause)),
        parser: cause => Parser(convert(cause))
    };
    var iterate = errors => Object.keys(errors).map(name => {
        var Err = defineError(name, Iso, errors[name]);
        result = {...result, [name]: cause => Err(convert(cause))};
    });

    iterate(errors0);
    iterate(errors1);
    return result;
};
