/**
 * Test plan
 *
 * @memberof Tests
 * @augments flattenArray
 * @locus Anywhere
 *
 */


import {flattenArray} from "./flattenArray.mjs";
export const underTest = flattenArray;



export const testPlan = {
    label: "function flattenArray",

    tests:  [
        {test: "normal formatting", args: [ [1, [2, 3], 4, [5,6] ] ],result: [1,2, 3, 4, 5, 6], type: "deepStrictEqual"},
        {test: "deeper arrays", args: [ [1, [2, 3], 4, [5, [6, 7] ] ] ],result: [1,2, 3, 4, 5, 6, 7], type: "deepStrictEqual"},
    ]
}
