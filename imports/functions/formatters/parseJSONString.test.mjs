/**
 * Test plan
 *
 * @memberof Tests
 * @augments parseJSONString
 * @locus Anywhere
 *
 */


import {parseJSONString as underTest} from "./parseJSONString.mjs";
export const parseJSONString = underTest;


const test1 = {one: 1, two: 2};
const test2 = [{one: 1}, {two: 2}];

export const testPlan = {
    label: "function parseJSONString",

    tests:  [
        {test: "normal object format", args: [JSON.stringify(test1), {}], type: "deepStrictEqual", result: test1},
        {test: "normal array format", args: [JSON.stringify(test2), {}], type: "deepStrictEqual", result: test2},
        {test: "not valid JSON object", args: [undefined, {}], type: "deepStrictEqual", result: {}},
        {test: "not valid JSON array", args: [undefined, []], type: "deepStrictEqual", result: []},
    ]
}
