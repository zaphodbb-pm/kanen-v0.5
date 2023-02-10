/**
 * Takes a number turns into integer and returns a string with added commas where required
 *
 * @function numString
 * @memberOf Functions:formatters:
 * @locus Anywhere
 *
 * @param {number} num
 * @param {String} separator
 *
 * @returns {String} - large number with thousands comma
 */

export function numString(num, separator = ",") {
    if (num && !isNaN(num) && (typeof num === "number")) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    } else {
        return "0";
    }
}
