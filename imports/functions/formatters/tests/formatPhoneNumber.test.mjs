/**
 * Test plan
 *
 * @memberof Tests
 * @augments formatPhoneNumber
 * @locus Anywhere
 *
 */

export const testPlan = {
    label: "function formatPhoneNumber",

    tests: [
        {test: "undefined args", args: [undefined], type: "strictEqual", result: ""},
        {test: "not a string", args: [123], type: "strictEqual", result: ""},
        {test: "truncated phone number", args: ["123"], type: "strictEqual", result: ""},
        {test: "local number", args: ["6132340987"], type: "strictEqual", result: "(613) 234-0987"},
        {test: "partial full phone number", args: ["237890123"], type: "strictEqual", result: ""},
        {test: "full phone number", args: ["12378901234"], type: "strictEqual", result: "+1 (237) 890-1234"},
    ]
}
