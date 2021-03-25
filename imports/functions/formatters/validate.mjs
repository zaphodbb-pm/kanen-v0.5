/**
 * Validate a variable and set default or error message.
 *
 * @memberof Functions
 * @function validate
 * @locus Anywhere
 *
 * @param {*} checkVariable - (required) item to validate
 * @param {string} type - (required) typeof variable === string to check against
 *
 * @param {Object} options - validation options
 * @param {*} options.default - (optional) sets a default value if validation fails
 * @param {boolean} options.warnDefault - (optional) emits warnings if default is being used
 * @param {Array} options.keys - (optional) array of keys (strings) that are required if variable is an object or array
 * @param {number} options.min - (optional) sets a minimum number if variable is under rang range
 * @param {number} options.max - (optional) sets a maximum number if variable is over
 *
 * @returns {*} - initial variable or transformed variable or default
 *
 */


export function validate(checkVariable, type, options){

    const tester = {
        "string": (variable) => typeof variable === "string",
        "number": (variable) => typeof variable === "number" && isFinite(variable),
        "array": (variable) => Array.isArray(variable)
                                && (options?.keys ? options.keys.length === variable.length : true ),

        "object": (variable) => variable
                                && typeof variable === 'object'
                                && variable.constructor === Object
                                && (options?.keys ? options.keys.every(key => Object.keys(variable).includes(key)) : true),

        "function": (variable) => typeof variable === "function",
        "boolean": (variable) => typeof variable === "boolean",
        "regexp": (variable) => variable && typeof variable === 'object' && variable.constructor === RegExp,
        "date": (variable) => variable instanceof Date,
        "symbol": (variable) => typeof variable === "symbol",
    }

    const transformer = {
        "string": (variable) => variable,
        "number": (variable) => {
            let min = options?.min ? Math.max(options.min, variable) : variable;
            return options?.max ? Math.min(options.max, min) : min;
        },

        "array": (variable) => variable,
        "object": (variable) =>  variable,
        "function": (variable) => variable,
        "boolean": (variable) => variable,
        "regexp": (variable) => variable,
        "date": (variable) => variable,
        "symbol": (variable) => variable,
    }

    if(tester[type](checkVariable)){
        return transformer[type](checkVariable);
    }else{

        if(options?.default){
            if(options?.warnDefault){
                console.warn(`Validate failed: substituted "${options.default}" for ${type} with value of "${checkVariable}"`);
            }
            return options.default;
        }else{
            console.error(`Validate error: ${type} with value "${checkVariable}"`);
            return undefined;
        }
    }
}



// test plans
const now = new Date();
const sym = Symbol("sym");
const re = new RegExp('ab+c', 'i');
const func = (a) => a + 1;


export const testPlan = {
    label: "function validate",

    tests:  [
        {test: "normal string", args: ["this is a string", "string"], result: "this is a string", type: "strictEqual"},
        {test: "null string", args: [null, "string"], result: undefined, type: "strictEqual"},
        {test: "default string", args: [undefined, "string", {default: "default string"}], result: "default string", type: "strictEqual"},
        {test: "default string with warning",
            args: [undefined, "string", {default: "default string", warnDefault: true}],
            result: "default string", type: "strictEqual"},

        {test: "normal number", args: [4, "number"], result: 4, type: "strictEqual"},
        {test: "null number", args: [null, "number"], result: undefined, type: "strictEqual"},
        {test: "below min number", args: [1, "number", {min: 3, max: 10}], result: 3, type: "strictEqual"},
        {test: "above max number", args: [15, "number", {min: 3, max: 10}], result: 10, type: "strictEqual"},

        {test: "normal array", args: [ [1,2], "array"], result: [1,2], type: "deepStrictEqual"},
        {test: "null array", args: [ null, "array", {default: [3,4]}], result: [3,4], type: "deepStrictEqual"},
        {test: "array with keys", args: [ [1,2,3], "array", {keys: [0,1,2]}], result: [1,2,3], type: "deepStrictEqual"},
        {test: "array with mismatched keys", args: [ [1,2,3], "array", {keys: [0,1]}], result: undefined, type: "deepStrictEqual"},

        {test: "normal object", args: [{a: 1, b: 2}, "object"], result: {a: 1, b: 2}, type: "deepStrictEqual"},
        {test: "null object", args: [ null, "object"], result: undefined, type: "deepStrictEqual"},
        {test: "null object with default", args: [ null, "object", {default: {a: 1, b: 2} }], result: {a: 1, b: 2}, type: "deepStrictEqual"},
        {test: "object with keys", args: [ {a: 1, b: 2}, "object", {keys: ["a", "b"]}], result: {a: 1, b: 2}, type: "deepStrictEqual"},
        {test: "object with mismatched keys", args: [ {a: 1, b: 2}, "object", {keys: ["c", "d"]}], result: undefined, type: "deepStrictEqual"},

        {test: "normal function", args: [ func, "function"], result: func, type: "deepStrictEqual"},
        {test: "normal boolean", args: [ true, "boolean"], result: true, type: "deepStrictEqual"},
        {test: "normal regexp", args: [ re, "regexp"], result: re, type: "deepStrictEqual"},
        {test: "normal date", args: [ now, "date"], result: now, type: "strictEqual"},
        {test: "normal symbol", args: [ sym, "symbol"], result: sym, type: "deepStrictEqual"},
    ]
}
