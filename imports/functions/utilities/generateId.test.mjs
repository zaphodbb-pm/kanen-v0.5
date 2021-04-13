/**
 * Test plan
 *
 * @memberof Tests
 * @augments generateId
 * @locus Anywhere
 *
 */



export const testPlan = {
    label: "function generateId",

    tests:  [
        {test: "normal operation", args: [16], result: 16, type: "checkStringLength"},
        {test: "not a number", args: [" "], result: 24, type: "checkStringLength"},
    ]
}
