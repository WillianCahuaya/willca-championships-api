var _ = require('lodash');

export const maskJSONOptions = {
    maskWith: "*",
    maxMaskedCharactersStr: 6,
    fields: ['access_token', 'refresh_token']
};

export const maskJSONFieldsDefault = function (obj) {
    return maskJSONFields(obj, maskJSONOptions);
};

export const maskJSONFields = function (obj, options) {
    try {
        return maskJSON(obj, options);
    } catch (ex) {
        return obj;
    }
};

const defaultJsonMaskOptions = { maskWith: "*", fields: [], maxMaskedCharactersStr: -1 };

const maskJSON = function (obj, options) {
    if (options) {
        options = mapWithDefaultValues(options, defaultJsonMaskOptions);
    } else {
        options = defaultJsonMaskOptions;
    }
    let maskedObj = {};
    try {
        maskedObj = JSON.parse(JSON.stringify(obj));
    } catch (ex) {
        return obj;
    }
    const fields = options.fields;
    for (const field of fields) {
        try {
            const value = _.get(maskedObj, field);
            if (value === undefined || value === null) {
                continue;
            }
            if (typeof value == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                _.set(maskedObj, field, `${options.maskWith}`.repeat(options.maxMaskedCharactersStr));
            } else {
                _.set(maskedObj, field, `${options.maskWith}`.repeat(value.toString().length));
            }
        } catch (ex) {
            continue;
        }
    }
    return maskedObj;
};

const mapWithDefaultValues = function (options, defaultOptions) {
    for (let key of Object.keys(defaultOptions)) {
        if (options[key] === undefined || options[key] === null) {
            options[key] = defaultOptions[key];
        }
    }
    return options;
};
