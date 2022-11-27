/**
 * Test plan
 *
 * @name injectText.test
 * @memberOf tests
 * @locus Client
 *
 * @notes
 *  1. Checking done by file testAssertions.mjs
 *
 */


const expectedResult = {
    bold: "template page",
    normal: "mounted",
    without: "without @html",
    with: "with @html"
};


export const testPlan = {
    label: "function injectText",

    tests:  [
        {   test: "check key length",
            args: [],
            type: "checkKeysLength",
            result: 4
        },

        {   test: "check output",
            args: [],
            type: "deepStrictEqual",
            result: expectedResult
        }
    ]
}
