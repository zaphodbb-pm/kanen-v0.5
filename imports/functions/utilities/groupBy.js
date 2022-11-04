/**
 * Group an array of objects by key.
 *
 * @memberOf Functions
 * @function groupBy
 * @locus Anywhere
 *
 * @param {Array} list - array or array of objects
 * @param {String} key - key name to group objects
 *
 * @returns {Object}
 *
 */


export function  groupBy(list, key){
    if(!list){return {};}

    return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
