/**
 * @summary Creates file names with date and time stamp.
 *
 * @memberof Components:AdminPanel
 * @function barBuilder
 * @locus Client
 *
 * @param {Object} conf - static configuration object
 * @param {Object} load - dynamic values to show
 *
 * @return {Object} - controls the gauge display with values
 *
 */

import {progessValue} from './progressValue.js'
import {setBackground} from "../../../functions/supportDOM/setBackground.js";

export function barBuilder(conf, load) {
    //** get decorative items or apply defaults
    let style = conf?.style ?? "ring"; // ring or pie
    let labels = conf?.title ? [conf.title] : [""];
    let suffix = conf?.suffix ?? "";
    let height = conf?.height ?? 8;
    let font = height / 5 + "rem";

    if (load && load.values) {
        let values = load.values[0];
        let maxVals = load.maxValues[0];
        let background = setBackground(conf, load, progessValue(load) );

        let value = values ? values : 0;
        let maxVal = maxVals ? maxVals : value;
        value = value < maxVal ? value : maxVal;

        let bar = Math.round(value / maxVal * 100);
        let bgBar = style === "ring" ? "#dde3e7" : "#FFF";

        return {
            label: labels[0],
            value: bar,
            suffix: suffix,
            style: style,
            ring: `background: conic-gradient(${background} ${bar}%, ${bgBar} 0%);
                    font-size: ${font}; height: ${height}rem; width: ${height}rem`
        }
    } else {
        return {
            label: "",
            value: 0,
            suffix: "%",
            style: "pie",
            ring: `font-size: ${font}; height: ${height}rem; width: ${height}rem`
        }
    }
}
