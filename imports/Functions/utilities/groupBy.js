/**
 * Group an array of objects by key.
 *
 * @function groupBy
 * @memberOf Functions:utilities:
 * @locus Anywhere
 *
 * @param {Array} list - array or array of objects
 * @param {String} key - key name to group objects
 *
 * @returns {Object}
 *
 */


export function  groupBy(list, key){
    if(!list || !Array.isArray(list)){return {};}

    return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}