module.exports = ({ defineError, getError, fetchErrors }) => {
    if (!getError('iso8583')) {
        const Iso = defineError('iso8583', null, 'ISO 8583 error');
        defineError('generic', Iso, 'Generic error');
        defineError('parser', Iso, 'Parser error');

        const iterate = errors => Object.keys(errors).forEach(name => {
            defineError(name, Iso, errors[name]);
        });

        iterate(require('./iso0').errors);
        iterate(require('./iso1').errors);
    }

    return fetchErrors('iso8583');
};
