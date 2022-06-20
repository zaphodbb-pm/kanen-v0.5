/**
 * Calculates the display value for a guage.
 *
 * @memberof Components:Widgets
 * @function progessValue
 * @locus Client

 * @param {Object} load - values to display
 *
 * @return {number} progress
 *
 */

//import {toDecimals} from "/imports/functions/formatters/toDecimals.js";

import {toDecimals} from "../../../functions/formatters/toDecimals.js";

export function progessValue(load) {
    if (load) {
        let num = load?.values ?? 0;
        num = num && Array.isArray(num) ? num[0] : num;
        return toDecimals(num, 1);
    } else {
        return 0;
    }
}
