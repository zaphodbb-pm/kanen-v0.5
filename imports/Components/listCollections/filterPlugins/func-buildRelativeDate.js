/**
 * Builds a relative offset date from today for the date filter.
 * To be used with "select" element when "filterText" has an array of relative dates.
 *
 * @function buildRelativeDate
 * @memberOf Components:listCollections:
 * @locus Client
 *
 * @param {String} sel - days_p_7 offset format
 *
 * @return {Object} - {start: yyyy-mm-dd, end: yyyy-mm-dd}
 *
 */


export function buildRelativeDate(sel){
    const now = Date.now();
    const parts = sel.split("_");
    const offset = parseInt( parts[2] ) * 1000 * 3600 * 24;   // time expressed in milliseconds / day
    const dir = parts[1] === "p" ? -1 : 1;

    const past = ( new Date(now - offset) ).toISOString().split("T")[0];
    const today = ( new Date(now) ).toISOString().split("T")[0];
    const future = ( new Date(now + offset) ).toISOString().split("T")[0];

    return dir < 0 ? {$gte: past, $lte: today} : {$gte: today, $lte: future};
}
