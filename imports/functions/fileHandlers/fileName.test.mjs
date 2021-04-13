/**
 * Test plan
 *
 * @memberof Tests
 * @augments fileName
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function fileName",

    tests:  [
        {   test: "modified file name",
            args: ["test_name", "json"],
            type: "match",
            result: /^test_name.*json$/
        },

        {   test: "file name length",
            args: ["test_name", "json"],
            type: "checkStringLength",
            result: 31
        }
    ]
}
