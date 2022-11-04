/**
 * Takes a number and returns a string with added commas where required
 *
 * @memberOf Functions
 * @function numString
 * @locus Anywhere
 *
 * @param {number} num
 *
 * @returns {String} - large number with thousands comma
 */

export function numString(num) {
    if (num && !isNaN(num) && (typeof num === "number")) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "0";
    }
}
