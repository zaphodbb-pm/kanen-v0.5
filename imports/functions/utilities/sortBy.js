/**
 * Sort an array of objects by key and direction.
 *
 * @memberOf Functions
 * @function sortBy
 * @locus Anywhere
 *
 * @param {Array} inList - list of objects
 * @param {string} key - key name
 * @param {number} sortDir - -1: sort descending; else sort ascending
 *
 * @returns {Object}
 *
 */


export function sortBy( inList, key, sortDir ) {
    if(!inList){return [];}

    let list =  inList.map( l => { return {...l}; });  // clone array of objcts
    let dir = sortDir && sortDir === -1 ? -1 : 1;

    list.sort((a, b) => (a[key] > b[key]) ? dir : -1 * dir)
    return list;
}
