/**
 * Builds an offset date for the date filter.  To be used with "input" element type=date.
 *
 * @function buildDate
 * @memberOf Components:listCollections:
 * @locus Client
 *
 * @param {String} val - yyyy-mm-dd date format
 * @param {Number} offset - +/- offset days from val
 *
 * @return {String} - yyyy-mm-dd
 *
 */


export function buildDate(val, offset){
    const date = new Date(val);

    const year = date.getUTCFullYear().toString();
    const month = date.getUTCMonth() + 1;
    const monthStr = month < 10 ? "0" + month : month.toString();   // add leading "0" if needed
    const day = date.getUTCDate() + offset;
    const dayStr = day < 10 ? "0" + day : day.toString();           // add leading "0" if needed

    return `${year}-${monthStr}-${dayStr}`;
}
