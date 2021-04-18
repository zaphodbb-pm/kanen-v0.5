/**
 * Test plan
 *
 * @memberof Tests
 * @lends pipe
 * @locus Anywhere
 *
 */


const func1 = (a) => 3 * a;
const func2 = (b) => 2 + b;
const func3 = (c) => c /2;



export const testPlan = {
    label: "function pipe",

    tests:  [
        {   test: "function list",
            function: [func1, func2, func3],
            args: [1],
            result: 2.5,
            type: "deepStrictEqual"
        },


        /*
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

         */
    ]
}
