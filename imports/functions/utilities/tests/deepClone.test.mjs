/**
 * Test plan
 *
 * @memberof Tests
 * @augments deepClone
 * @locus Anywhere
 *
 */


const obj = {a: 11, b: "22", c: []};


export const testPlan = {
    label: "function deepClone",

    tests: [
        {   test: "normal message",
            args: [obj],
            original: {a: 11, b: "22", c: []},
            result: obj,
            type: "checkMutate",
        }
    ]
}
