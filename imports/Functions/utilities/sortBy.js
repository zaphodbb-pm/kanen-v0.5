/**
 * Sort an array of objects by key and direction.
 *
 * @function sortBy
 * @memberOf Functions:utilities:
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
    if(!inList || !Array.isArray(inList) || !key ){return [];}

    // @ts-ignore
    let list =  inList.map( l => { return {...l}; });  // clone array of objects
    let dir = sortDir && sortDir === -1 ? -1 : 1;

    list.sort((a, b) => (a[key] > b[key]) ? dir : -1 * dir)
    return list;
}
