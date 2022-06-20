/**
 * Test plan
 *
 * @memberof Tests
 * @augments dotNotation
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function dotNotation",

    tests: [
        {test: "normal field get", args: [{a:{b:{etc:5}}}, 'a.b.etc'], type: "strictEqual", result: 5},
        {test: "missing field", args: [{a:{b:{def:5}}}, 'a.b.etc'], type: "strictEqual", result: null},
        {test: "no object", args: [undefined], type: "strictEqual", result: null},
    ]
}
