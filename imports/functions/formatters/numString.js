/**
 * Takes a number and returns a string with added commas where required
 *
 * @memberOf functions
 * @function numString
 * @locus Anywhere
 *
 * @param {number} num
 * @param {String} separator
 *
 * @returns {String} - large number with thousands comma
 */

export function numString(num, separator = ",") {
    if (num && !isNaN(num) && (typeof num === "number")) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    } else {
        return "0";
    }
}
