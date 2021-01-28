/**
 * For use by widgets; gets info from the flow object, extracts colour information and sets a background display colour.
 *
 * @memberof Functions
 * @function setBackground
 * @locus Client
 *
 * @param {Object} conf - widget configuration object that holds colour information
 * @param {Object} msg - payload from reactive flow object
 * @param {Number} progVal - measured value from payload
 *
 * @return {String} - hex colour value for display
 *
 */



export function setBackground(conf, msg, progVal) {
    let out = "#EEEEEE";

    if (conf) {
        let bg = conf && conf.bgColours ? conf.bgColours : out;

        let rangeNorm = conf && conf.bgNormal ? conf.bgNormal : null;
        let rangeWarn = conf && conf.bgWarning ? conf.bgWarning : null;

        rangeNorm = Array.isArray(rangeNorm) ? rangeNorm : null;
        rangeWarn = Array.isArray(rangeWarn) ? rangeWarn : null;

        if (Array.isArray(bg)) {
            let max = msg && msg.maxValues ? msg.maxValues[0] : 1;

            if (rangeNorm && rangeWarn) {
                out = bg[2];

                if (max * rangeWarn[0] <= progVal && progVal <= max * rangeWarn[1]) {
                    out = bg[1];
                }

                if (max * rangeNorm[0] <= progVal && progVal <= max * rangeNorm[1]) {
                    out = bg[0];
                }

            } else {
                out = bg[0];
            }

        } else {
            out = bg;
        }
    }

    return out;
}






const config = {
    bgColours: ["#00FF00", "#FFFF00", "#FF0000"],
    bgNormal: [0, .66],             // percent range of values for normal operation
    bgWarning: [.66, .80],          // percent range of values for warning operation
};

const maxValue = {maxValues: [100]};


export const testPlan = {
    label: "function setBackground",

    tests:  [
        {test: "normal value", args: [config, maxValue, 50],result: "#00FF00", type: "strictEqual"},
        {test: "warning value", args: [config, maxValue, 75], result: "#FFFF00", type: "strictEqual"},
        {test: "danger value", args: [config, maxValue, 90], result: "#FF0000", type: "strictEqual"},
        {test: "value is not valid", args: [config, maxValue, undefined], result: "#FF0000", type: "strictEqual"},
        {test: "no config file", args: [undefined, maxValue, 50], result: "#EEEEEE", type: "strictEqual"},
    ]
}
