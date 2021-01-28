/**
 * Takes a number and scale factor, uses absolute value, scales number and returns a formatted string.
 *
 * @memberof Functions
 * @function formatNumber
 * @locus Anywhere
 *
 * @param {Number} num
 * @param {Number} f - scale factor; can be float
 *
 * @return {String} - formatted number scaled by f
 */

import {numString} from "./numString.mjs";

export function formatNumber(num, f) {
    const factor = f ?? 1;
    const number = typeof num === "number" ? Math.abs(num ?? 0) * factor : 0;

    let out = "";

    if (number < 1) {
        out = number.toFixed(3)
    }else if (number >= 1 && number < 10) {
        out = number.toFixed(2);
    }else if (number >= 10 && number < 100) {
        out = number.toFixed(1);
    }else if (number >= 100 && number < 1000) {
        out = number.toFixed(0);
    }else if (number > 1000) {
        out = numString(Math.round(number));
    }

    return out;
}


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
