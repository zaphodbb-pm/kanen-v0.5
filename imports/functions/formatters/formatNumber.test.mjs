/**
 * Test plan
 *
 * @memberof Tests
 * @augments formatNumber
 * @locus Anywhere
 *
 */


import {formatNumber} from "./formatNumber.mjs";
export const underTest = formatNumber;


export const testPlan = {
    label: "function formatNumber",

    tests:  [
        {   test: "undefined args",
            args: [undefined, undefined],
            type: "strictEqual",
            result: "0.000"
        },

        {   test: "single digit",
            args: [0, 5],
            type: "strictEqual",
            result: "0.000"
        },

        {   test: "two digits",
            args: [9.45, 4],
            type: "strictEqual",
            result: "37.8"
        },
        {   test: "three digits",
            args: [88.88, 3],
            type: "strictEqual",
            result: "267"
        },

        {   test: "four digits",
            args: [777, 0.01],
            type: "strictEqual",
            result: "7.77"
        },

        {   test: "five digits",
            args: [26666, 1],
            type: "strictEqual",
            result: "26,666"
        },
    ]
}
