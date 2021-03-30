/**
 * Test plan
 *
 * @memberof Tests
 * @augments flattenObject
 * @locus Anywhere
 *
 */


import {flattenObject} from "./flattenObject.mjs";
export const underTest = flattenObject;




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
