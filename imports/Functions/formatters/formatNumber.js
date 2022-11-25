/**
 * Takes a number and scale factor, uses absolute value, scales number and returns a formatted string.
 *
 * @function formatNumber
 * @memberOf Functions:formatters:
 * @locus Anywhere
 *
 * @param {number} num
 * @param {number} f - scale factor; can be float
 *
 * @return {String} - formatted number scaled by f
 */


export function formatNumber(num, f) {
    const factor = typeof f === "number" ? f : 1;
    const number = typeof num === "number" ? Math.abs(num) * factor : 0;

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
        out = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return out;
}
