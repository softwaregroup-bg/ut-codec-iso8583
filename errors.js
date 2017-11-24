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
    let result = {
        generic: cause => new Generic(convert(cause))
    };
    var iterate = errors => Object.keys(errors).forEach(name => {
        var Err = defineError(name, Iso, errors[name]);
        result[name] = cause => new Err(convert(cause));
    });

    iterate(errors0);
    iterate(errors1);
    return result;
};
