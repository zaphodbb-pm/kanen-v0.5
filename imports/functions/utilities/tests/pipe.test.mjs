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
            type: "strictEqual"
        }
    ]
}
