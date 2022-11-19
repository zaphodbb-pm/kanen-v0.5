/**
 * Functional composition of pure Functions.
 *
 * @memberOf Functions:utilities:
 * @function pipe
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
