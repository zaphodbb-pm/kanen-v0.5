/**
 * Test plan
 *
 * @memberof Tests
 * @augments setBackground
 * @locus Anywhere
 *
 */


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
