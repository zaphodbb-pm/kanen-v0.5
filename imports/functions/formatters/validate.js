/**
 * The purpose of this function is to be used at the boundary / demarcation point where
 * unknown data is ingested and must be checked / shaped before it can be reliable.
 * This is set of methods to validate a variable or shape a variable to a range, undefined or default value.
 * Optionally, a warning or error message can be sent to the console to help with debugging.
 *
 *
 * @memberof Functions
 * @function validate
 * @locus Anywhere
 *
 * @typedef {function} Validate
 * @property {*} variable - (required) item to validate
 * @property {Object} opts - validation options
 * @property {*} opts.default - (optional) sets a default value if validation fails
 * @property {boolean} opts.warn - (optional) emits warnings if default is being used
 * @property {Array} opts.keys - (optional) array of keys (strings) that are required if variable is an object or array
 * @property {number} opts.min - (optional) sets a minimum number if variable is under rang range
 * @property {number} opts.max - (optional) sets a maximum number if variable is over
 *
 * @returns {function} - checking function for various data types
 *
 * @notes
 *  1. Supported types (Type) : boolean, string, number, float, array, object,
 *                      function, regexp, date, symbol
 *
 *  2. format isType(variable, options) checks for correctness and returns a boolean - ie isString(item)
 *      options = {keys: ["field1", "field2"]} for checking object for keys present
 *
 *  3. format shapeType returns the original value if correct or the default value if available else undefined
 *      ie shapeArray(item, options)
 *      options = {min: 1, max: 20, default: ["one"]}
 *          where if array.length < min get default value or undefined if no default given
 *          where if array.length > max, truncate array to max number of items
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


    const isString = (variable) => typeof variable === "string";

    const shapeString = (variable, opts = {}) => {
        return isString(variable) && _checkMinLength(variable, opts)
            ? _checkMaxLength(variable, opts)
            : _logs(opts, "string", variable);
    };

    const isNumber = (variable) => typeof variable === "number" && isFinite(variable);

    const shapeNumber = (variable, opts = {}) => {
        return isNumber(variable)
            ? Math.max(opts?.min ?? variable, Math.min( opts.max ?? variable, variable) )
            : _logs(opts, "number", variable);
    };


    const isArray = (variable) => Array.isArray(variable);

    const shapeArray = (variable, opts = {}) => {
        return isArray(variable) && _checkMinLength(variable, opts)
            ? _checkMaxLength(variable, opts)
            : _logs(opts, "array", variable);
    };

    const isObject = (variable, opts = {}) =>   variable
        && typeof variable === 'object'
        && variable.constructor === Object
        // @ts-ignore
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
        // @ts-ignore
        isBoolean,

        isString,
        shapeString,

        isNumber,
        shapeNumber,

        isArray,
        shapeArray,

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
