/**
 * Test plan
 *
 * @memberOf Tests
 * @augments groupBy
 * @locus Anywhere
 *
 */



export const testPlan = {
    label: "function groupBy",

    tests:  [
        {   test: "normal group",
            args: [ [{a: 28, b: 3}, {a: 24, b: 5}, {a: 16, b: 7}, {a: 16, b: 9}], "a"],
            result: {
                '16': [{a: 16, b: 7}, {a: 16, b: 9}],
                '24': [{a: 24, b: 5}],
                '28': [{a: 28, b: 3}]
            },
            type: "deepStrictEqual"
        },

        {   test: "reverse normal list",
            args: [ [{a: 28, b: "one"}, {a: 24, b: "two"}, {a: 16, b: "three"}], "b"],
            result: {
                'one': [{a: 28, b: "one"}],
                'two': [{a: 24, b: "two"}],
                'three': [{a: 16, b: "three"}]
            },
            type: "deepStrictEqual"
        },

        {   test: "no list",
            args: [ undefined, "a"],
            result: {},
            type: "deepStrictEqual"
        },
    ]
}

