/**
 * @summary Flattens a deeply nested object.
 *
 * @memberof Functions
 * @function flattenObject
 * @locus Anywhere
 *
 * @param {Object} obj - deeply nested
 * @return {Object} - flattened to only one level
 *
 */


export function flattenObject(obj) {
    let flat = {};

    if(typeof obj !== "object"){ return flat;}

    for (let i in obj) {

        if(obj[i] !== null && typeof obj[i] === 'object' && !Array.isArray(obj[i])){

            let flatObject = flattenObject(obj[i]);
            for (let x in flatObject) {
                flat[x] = flatObject[x];
            }

        } else {
            flat[i] = obj[i];
        }
    }

    return flat;
}





export const testPlan = {
    label: "function flattenObject",

    tests:  [
        {   test: "normal nested object",
            args: [ {a: {b: 1}, c: {d: {e: 2}}} ],
            result: {b: 1, e: 2},
            type: "deepStrictEqual"},

        {   test: "nested arrays in object",
            args: [ {a: [1,2], b: {c: [2, 3]} } ],
            result: {a: [1, 2], c: [2, 3]},
            type: "deepStrictEqual"
        },

        {   test: "invalid argument",
            args: [ undefined ],
            result: {},
            type: "deepStrictEqual"
        },

        {   test: "check for no mutation",
            args: [ {a: 1, b: {c: 2}} ],
            result: {a: 1, c: 2},
            original: {a: 1, b: {c: 2}},
            type: "checkMutate"
        },
    ]
}
