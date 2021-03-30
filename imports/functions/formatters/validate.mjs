/**
 * Validate a variable and set default or error message.
 *
 * @memberof Functions
 * @function validate
 * @locus Anywhere
 *
 * @type {*} variable - (required) item to validate*
 * @type {Object} opts - validation options
 * @type {*} opts.default - (optional) sets a default value if validation fails
 * @type {boolean} opts.warn - (optional) emits warnings if default is being used
 * @type {Array} opts.keys - (optional) array of keys (strings) that are required if variable is an object or array
 * @type {number} opts.min - (optional) sets a minimum number if variable is under rang range
 * @type {number} opts.max - (optional) sets a maximum number if variable is over
 *
 * @returns {function} - checking function for various data types
 *
 */


const Validate = () => {

    const _logs = (options, type, checked) => {
        if(options?.default){
            if(options?.warn){
                console.warn(`Validate failed: substituted "${options.default}" for ${type} with value of "${checked}"`);
            }
            return options.default;
        }else{
            console.error(`Validate error: ${type} with value "${checked}"`);
            return undefined;
        }
    }

    const _checkMinLength = (item, opts = {}) => {
        return item && ( opts?.min ? opts?.min < item.length : true);
    }

    const _checkMaxLength = (item, opts = {}) => {
        return item && opts?.max ? ( opts.max < item.length ? item.slice(0, opts.max) : item ) : item;
    }


    const isBoolean = (variable) => typeof variable === "boolean";


    const isString = (variable, opts = {}) => {
        if(typeof variable === "string" && _checkMinLength(variable, opts)){
            return _checkMaxLength(variable, opts);
        }else{
            return _logs(opts, "string", variable);
        }
    };

    const isNumber = (variable, opts = {}) => {
        if(typeof variable === "number" && isFinite(variable)){
            return Math.max(opts?.min ?? variable, Math.min( opts.max ?? variable, variable) );
        }else{
            return _logs(opts, "number", variable);
        }
    };

    const isArray = (variable, opts = {}) => {
        if(Array.isArray(variable) && _checkMinLength(variable, opts)){
            return _checkMaxLength(variable, opts);
        }else{
            return _logs(opts, "array", variable);
        }
    };

    const isObject = (variable, opts = {}) =>   variable
                                                && typeof variable === 'object'
                                                && variable.constructor === Object
                                                && (opts?.keys ? opts.keys.every(key => Object.keys(variable).includes(key)) : true);

    const shapeObject = (variable, opts = {}) => {
        return isObject(variable) ? (opts?.default ? {...opts.default, ...variable} : variable) : _logs(opts, "object", variable);
    };

    const isFunction = (variable) => typeof variable === "function";

    const shapeFunction = (variable, opts = {}) => {
        return isFunction(variable) ? variable : _logs(opts, "symbol", variable);
    };


    const isRegexp = (variable) => variable && typeof variable === 'object' && variable.constructor === RegExp;

    const shapeRegexp = (variable, opts = {}) => {
        return isRegexp(variable) ? variable : _logs(opts, "regexp", variable);
    };


    const isDate = (variable) => variable instanceof Date;

    const shapeDate = (variable, opts = {}) => {
        return isDate(variable) ? variable : _logs(opts, "date", variable);
    };


    const isSymbol = (variable) => typeof variable === "symbol";

    const shapeSymbol = (variable, opts = {}) => {
        return isSymbol(variable) ? variable : _logs(opts, "symbol", variable);
    };

    return{
        isBoolean,

        isString,
        isNumber,
        isArray,

        isObject,
        shapeObject,

        isFunction,
        shapeFunction,

        isRegexp,
        shapeRegexp,

        isDate,
        shapeDate,

        isSymbol,
        shapeSymbol
    }
}


export const validate = Validate();










/*
export function validate2(checkVariable, type, options){

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

*/

// test plans
const now = new Date();
const sym = Symbol("sym");
const re = new RegExp('ab+c', 'i');
const func = (a) => a + 1;
const obj = {a: 1, b: 2, c: 3};
const obj2 = {c: 44, d: 22, e: 66}

const opts = {
    default: "not a number",
    warn: true
}

const opts2 = {
    min: 20,
    max: 9,
    warn: true
}

const opts3 = {
    min: 3,
    max: 10,
}

const opts4 = {
    default: [3,4, 5, 6, 7]
}

const opts5 = {
    min: 3,
    max: 4
}


export const testPlan = {
    label: "function validate",

    tests:  [
        {test: "normal true boolean",   function: "isBoolean", args: [true], result: true, type: "strictEqual"},
        {test: "normal false boolean",  function: "isBoolean", args: [false], result: true, type: "strictEqual"},
        {test: "undefined boolean",     function: "isBoolean", args: [undefined], result: false, type: "strictEqual"},

        /*
        {test: "normal string", args: ["is a string", opts], function: "isString",  result: "is a string", type: "strictEqual"},
        {test: "normal string 2", args: ["is a very long string", opts2], function: "isString",  result: "is a very", type: "strictEqual"},
        {test: "default string", args: [undefined, opts2], function: "isString",  result: undefined, type: "strictEqual"},
        {test: "null string", args: [null, opts], function: "isString", result: opts.default, type: "strictEqual"},

        {test: "normal number", args: [4], function: "isNumber", result: 4, type: "strictEqual"},
        {test: "null number", args: [null], function: "isNumber", result: undefined, type: "strictEqual"},
        {test: "below min number", args: [1, opts3], function: "isNumber", result: 3, type: "strictEqual"},
        {test: "above max number", args: [15, opts3], function: "isNumber", result: 10, type: "strictEqual"},

        {test: "normal array", args: [ [1,2]], function: "isArray", result: [1,2], type: "deepStrictEqual"},
        {test: "null array", args: [ null, opts4], function: "isArray", result: [3,4, 5, 6, 7], type: "deepStrictEqual"},
        {test: "short array", args: [ [1, 2], opts5], function: "isArray", result: undefined, type: "deepStrictEqual"},
        {test: "long array", args: [ [3, 4, 5, 6, 7], opts5], function: "isArray", result: [3, 4, 5, 6], type: "deepStrictEqual"},

         */

        {test: "normal object",         function: "isObject",       args: [obj, {keys: ["a", "b", "c"]}], result: true, type: "deepStrictEqual"},
        {test: "object missing keys",   function: "isObject",       args: [obj, {keys: ["a", "b", "c", "d"]}], result: false, type: "deepStrictEqual"},
        {test: "not a object",          function: "isObject",       args: [4], result: false, type: "deepStrictEqual"},
        {test: "shape object",          function: "shapeObject",    args: [obj2, {default: obj}], result: {...obj, ...obj2}, type: "deepStrictEqual"},
        {test: "shape not a object",    function: "shapeObject",    args: [4, {default: obj}], result: obj, type: "deepStrictEqual"},

        {test: "normal function",       function: "isFunction",     args: [func], result: true, type: "deepStrictEqual"},
        {test: "not a function",        function: "isFunction",     args: [4], result: false, type: "deepStrictEqual"},
        {test: "shape function",        function: "shapeFunction",  args: [func], result: func, type: "deepStrictEqual"},
        {test: "shape not a function",  function: "shapeFunction",  args: [4, {default: func}], result: func, type: "deepStrictEqual"},

        {test: "normal regexp",         function: "isRegexp",       args: [re],  result: true, type: "deepStrictEqual"},
        {test: "not a regexp",          function: "isRegexp",       args: [23], result: false, type: "deepStrictEqual"},
        {test: "shape regexp",          function: "shapeRegexp",    args: [re], result: re, type: "deepStrictEqual"},
        {test: "shape is not a regexp", function: "shapeRegexp",    args: [ 34, {default: re}], result: re, type: "deepStrictEqual"},

        {test: "normal date",           function: "isDate",         args: [now], result: true, type: "strictEqual"},
        {test: "not a date",            function: "isDate",         args: [44], result: false, type: "strictEqual"},
        {test: "shape date",            function: "shapeDate",      args: [now], result: now, type: "deepStrictEqual"},
        {test: "shape not a date",      function: "shapeDate",      args: [45, {default: now}], result: now, type: "deepStrictEqual"},

        {test: "normal symbol",         function: "isSymbol",       args: [sym],  result: true, type: "deepStrictEqual"},
        {test: "not a symbol",          function: "isSymbol",       args: [4], result: false, type: "deepStrictEqual"},
        {test: "shape symbol",          function: "shapeSymbol",    args: [sym], result: sym, type: "deepStrictEqual"},
        {test: "shape not a symbol",    function: "shapeSymbol",    args: [4, {default: sym}], result: sym, type: "deepStrictEqual"},


        /*
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

         */
    ]
}
