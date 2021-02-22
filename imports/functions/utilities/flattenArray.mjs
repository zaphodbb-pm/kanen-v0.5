/**
 * Flattens a two level deep array.
 *
 * @memberof Functions
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




export const testPlan = {
    label: "function flattenArray",

    tests:  [
        {test: "normal formatting", args: [ [1, [2, 3], 4, [5,6] ] ],result: [1,2, 3, 4, 5, 6], type: "deepStrictEqual"},
        {test: "deeper arrays", args: [ [1, [2, 3], 4, [5, [6, 7] ] ] ],result: [1,2, 3, 4, 5, 6, 7], type: "deepStrictEqual"},
    ]
}
