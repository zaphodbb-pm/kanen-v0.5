/**
 * Builds object from key/value pair.
 *
 * @function objectify
 * @memberOf Server:Functions:
 * @locus Server
 *
 * @param {String} field - name of object key
 * @param {String|Number|Object|Array} val
 *
 * @return {Object} - {key: val}
 *
 */


export function objectify(field, val) {
    let object = {};

    if(typeof field === "string"){
        object[field] = val ?? {$exists: true};
    }

    return object;
}
