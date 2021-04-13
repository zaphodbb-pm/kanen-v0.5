/**
 * Test plan
 *
 * @memberof Tests
 * @augments textColour
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function textColour",

    tests:  [
        {test: "light format", args: ["rgb(200, 100, 10)"],result: "#000000", type: "strictEqual"},
        {test: "dark format", args: ["rgb(128, 100, 64)"],result: "#FFFFFF", type: "strictEqual"},
        {test: "undefined input", args: [undefined], result: "#000000", type: "strictEqual"},
        {test: "not a valid input", args: ["text"], result: "#000000", type: "strictEqual"},
    ]
}
