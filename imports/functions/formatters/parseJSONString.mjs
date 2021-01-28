/**
 * @summary Converts a json string into an object and checks to make sure string is valid json or returns empty array.
 *
 * @memberof Functions
 * @function parseJSONString
 * @locus Anywhere
 *
 * @param {String} string
 * @param {Object} obj - set default return value
 *
 * @returns {Object}
 *
 */


export function parseJSONString(string, obj) {
    let info = Array.isArray(obj) ? [] : {};                   // array of output objects to be rendered

    try {
        info = JSON.parse(string);
    }
    catch (err) {}

    return info;
}


const test1 = {one: 1, two: 2};
const test2 = [{one: 1}, {two: 2}];

export const testPlan = {
    label: "function parseJSONString",

    tests:  [
        {test: "normal object format", args: [JSON.stringify(test1), {} ], type: "deepStrictEqual", result: test1 },
        {test: "normal array format", args: [JSON.stringify(test2), {} ], type: "deepStrictEqual", result: test2},
        {test: "not valid JSON object", args: [undefined, {} ], type: "deepStrictEqual",  result: {}},
        {test: "not valid JSON array", args: [undefined, [] ], type: "deepStrictEqual",  result: []},
    ]
}
