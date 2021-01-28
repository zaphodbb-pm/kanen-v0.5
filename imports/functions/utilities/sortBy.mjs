/**
 * Sort an array of objects by key and direction.
 *
 * @memberof Functions
 * @function sortBy
 * @locus Anywhere
 *
 * @param {Array} inList - list of objects
 * @param {Array} key - key name
 * @param {Number} sortDir - -1: sort descending; else sort ascending
 * @param {Boolean} clone - deep clone list
 *
 * @returns {Object}
 *
 */


import {deepClone} from "./deepClone.mjs";

export function sortBy( inList, key, sortDir, clone ) {
    if(!inList){return [];}

    let list = !!clone ? deepClone(inList) : inList;
    let dir = sortDir && sortDir === -1 ? -1 : 1;

    list.sort((a, b) => (a[key] > b[key]) ? dir : -1 * dir)
    return list;
}





export const testPlan = {
    label: "function sortBy",

    tests:  [
        {   test: "normal list",
            args: [ [{a: 28, b: 3}, {a: 24, b: 5}, {a: 16, b: 7}], "a", 1 ],
            result: [ {a: 16, b: 7}, {a: 24, b: 5}, {a: 28, b: 3} ],
            type: "deepStrictEqual"
        },

        {   test: "not a number",
            args: [ undefined, "a", 1],
            result: [],
            type: "deepStrictEqual"
        },
    ]
}
