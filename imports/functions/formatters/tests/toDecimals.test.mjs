/**
 * Test plan
 *
 * @memberof Tests
 * @augments toDecimals
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function toDecimals",

    tests:  [
        {test: "normal formatting", args: [12345.678954, 2], result: 12345.68, type: "strictEqual"},
        {test: "not a number", args: [undefined, 3], result: 0.000, type: "strictEqual"},
        {test: "negative digits", args: [123.456789, -3], result: 123.457, type: "strictEqual"},
    ]
}
