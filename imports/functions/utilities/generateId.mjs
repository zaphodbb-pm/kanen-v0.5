/**
 * Own version of a character selector in order to build a variable length api key.
 *
 * @memberof Functions
 * @function generateId
 * @locus Anywhere
 *
 * @param {Number} length - length / number of characters for api key
 *
 * @returns {String} - api key of requested length
 */

export function generateId( length ) {
    const len = length && typeof length === "number" ? length : 24;
    const choices = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let out = [];

    let arr = new Uint8Array(len);

    try {
        window.crypto.getRandomValues(arr);
    }catch {
        arr = arr.map( a => Math.round( Math.random() * 255 ) );
    }

    arr.forEach(function (item) {
        let pos = Math.round(item / 255 * choices.length);
        out.push(choices.charAt(pos));
    });

    return out.join("");
}




export const testPlan = {
    label: "function generateId",

    tests:  [
        {test: "normal operation", args: [16], result: 16, type: "checkStringLength"},
        {test: "not a number", args: [" "], result: 24, type: "checkStringLength"},
    ]
}
