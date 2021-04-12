/**
 * Test plan
 *
 * @memberof Tests
 * @augments numString
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function numString",

    tests:  [
        {test: "normal formatting", args: [123456789.54], type: "strictEqual", result: "123,456,789.54"},
        {test: "number is falsey", args: [undefined], type: "strictEqual", result: "0"},
        {test: "not a number", args: [{}], type: "strictEqual", result: "0"},
    ]
}
