/**
 * @summary General purpose curry function.
 *
 * @memberOf Functions
 * @function adjustHexColor
 * @locus Anywhere
 *
 * @param {Function} func - function to be curried
 *
 * @return {Function}
 *
 */

export function curry(func) {

    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };

}
