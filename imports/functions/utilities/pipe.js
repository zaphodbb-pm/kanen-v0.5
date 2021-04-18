/**
 * Functional composition of pure functions.
 *
 * @memberof Functions
 * @function pipe
 * @locus Anywhere
 *
 * @param {Array.<Function>} fns
 *
 * @returns {*} - result of functions concatenation
 *
 */


export const pipe = (...fns) => v => {
    return fns.reduce((res, func) => {
        return func(res);
        }, v);
};
