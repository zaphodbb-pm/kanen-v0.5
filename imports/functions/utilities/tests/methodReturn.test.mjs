/**
 * Test plan
 *
 * @memberOf Tests
 * @augments methodReturn
 * @locus Anywhere
 *
 */



export const testPlan = {
    label: "function methodReturn",

    tests: [
        {   test: "normal message",
            args: [undefined, {some: "value"}, "Test-Point", "s"],
            result: 'debug res: Test-Point= {"some":"value"}',
            type: "deepStrictEqual",
        },

        {   test: "no debug options set",
            args: [undefined, {some: "value"}, "Test-Point", "def"],
            result: false,
            type: "deepStrictEqual",
        },

        {   test: "error message",
            args: [{message: "error received"}, undefined, "Test-Point", "s"],
            result: 'debug err: Test-Point= {"message":"error received"}',
            type: "deepStrictEqual",
        }
    ]
}
