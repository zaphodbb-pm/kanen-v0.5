/**
 * Test plan
 *
 * @memberof Tests
 * @augments sortBy
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function sortBy",

    tests:  [
        {   test: "normal list",
            args: [ [{a: 28, b: 3}, {a: 24, b: 5}, {a: 16, b: 7}], "a", 1 ],
            result: [ {a: 16, b: 7}, {a: 24, b: 5}, {a: 28, b: 3} ],
            type: "deepStrictEqual"
        },

        {   test: "reverse normal list",
            args: [ [{a: 28, b: 3}, {a: 24, b: 5}, {a: 16, b: 7}], "b", -1 ],
            result: [ {a: 16, b: 7}, {a: 24, b: 5}, {a: 28, b: 3} ],
            type: "deepStrictEqual"
        },

        {   test: "no list",
            args: [ undefined, "a", 1],
            result: [],
            type: "deepStrictEqual"
        },
    ]
}
