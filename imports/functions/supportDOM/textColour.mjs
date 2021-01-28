/**
 * Calculates white or black text colour for a given RGB background colour.
 *
 * @memberof Functions
 * @function textColour
 * @locus Client
 *
 * @param {String} rgb - typically "rgb(128, 100, 64)"
 *
 * @return {string} "#000000" or "#FFFFFF"
 *
 */

export function textColour(rgb) {
    if(!rgb || typeof rgb !== "string" || !rgb.includes("rgb(")){
        return "#000000";       // return default text colour
    }

    let vals = rgb.replace("rgb(", "").replace(")", "");
    vals = vals.split(",");

    //** get best contrast colour for text
    let yiq = Math.round((parseInt(vals[0]) * 299 + parseInt(vals[1]) * 587 + parseInt(vals[1]) * 114) / 1000);
    return (yiq >= 128) ? "#000000" : "#FFFFFF";
}





export const testPlan = {
    label: "function textColour",

    tests:  [
        {test: "light format", args: ["rgb(200, 100, 10)"],result: "#000000", type: "strictEqual"},
        {test: "dark format", args: ["rgb(128, 100, 64)"],result: "#FFFFFF", type: "strictEqual"},
        {test: "undefined input", args: [undefined], result: "#000000", type: "strictEqual"},
        {test: "not a valid input", args: ["text"], result: "#000000", type: "strictEqual"},
    ]
}
