/**
 * Allows test programs to add a waiting period during a test.
 * Typically used to allow a svelte component to finish loading all HTML parts.
 *
 * @function waitFor
 * @locus Client
 *
 * @param {number} delay - delay time in milliseconds (default 50 msec)
 *
 * @returns {Promise} - resolved when time has expired
 *
 */


export function waitFor(delay = 50){
    return new Promise(resolve => setTimeout(resolve, delay));
}