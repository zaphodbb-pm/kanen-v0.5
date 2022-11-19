/**
 * Test plan
 *
 * @memberOf Tests
 * @augments fractionalNumber
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function fractionalNumber",

    tests:  [
        {test: "normal formatting", args: [1.125, "imperial"],result: "1 1/8", type: "strictEqual"},
        {test: "not a number", args: [undefined, "imperial"], result: " ", type: "strictEqual"},
        {test: "metric number", args: [123.456789, "metric"], result: "123.5", type: "strictEqual"},
    ]
}
