/**
 * @summary Converts a json string into an object and checks to make sure string is valid json or returns empty array.
 *
 * @memberof Functions
 * @function parseJSONString
 * @locus Anywhere
 *
 * @param {String} string
 * @param {Object} obj - set default return value
 *
 * @returns {Object}
 *
 */


export function parseJSONString(string, obj) {
    let info = Array.isArray(obj) ? [] : {};                   // array of output objects to be rendered

    try {
        info = JSON.parse(string);
    }
    catch (err) {}

    return info;
}
