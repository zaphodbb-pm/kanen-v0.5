/**
 * Flattens a two level deep array.
 *
 * @memberOf Functions
 * @function flattenArray
 * @locus Anywhere
 *
 * @param {Array} arr -array of arrays to flatten into single level
 *
 * @returns {Object}
 *
 */


export function flattenArray(arr) {
    let flat1 = [].concat.apply([], arr);
    return [].concat.apply([], flat1);
}
