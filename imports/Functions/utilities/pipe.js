/**
 * Functional composition of pure Functions.
 *
 * @function pipe
 * @memberOf Functions:utilities:
 * @locus Anywhere
 *
 * @param {Array.<Function>} fns
 *
 * @returns {*} - result of Functions concatenation
 *
 */


export const pipe = (...fns) => v => {
    return fns.reduce((res, func) => {
        return func(res);
        }, v);
};
