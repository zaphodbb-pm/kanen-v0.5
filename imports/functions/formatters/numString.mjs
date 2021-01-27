/**
 * Add commas to big formatters and returns a string
 *
 * @memberof Functions
 * @function numString
 * @locus Anywhere
 *
 * @param {Number} num
 * @returns {String} - large number with thousands comma
 */

export function numString(num) {
    if (num && !isNaN(num) && (typeof num === "number")) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "0";
    }
}


export const testPlan = {
    label: "function numString",

    tests:  [
        {test: "normal formatting", args: [123456789.54], result: "123,456,789.54"},
        {test: "number is falsey", args: [undefined],  result: "0"},
        {test: "not a number", args: [{}],  result: "0"},
    ]
}
