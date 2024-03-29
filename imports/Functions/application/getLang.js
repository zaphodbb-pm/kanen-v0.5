/**
 * Finds a user's language preference
 *
 * @function getLang
 * @memberOf Functions:application:
 * @locus Client
 *
 * @param {string} choice - two letter suggested language key
 *
 * @returns {String} - two letter language code
 *
 */


export function getLang(choice){
    const navigator = window?.navigator ?? {};
    let lang = navigator?.languages ? navigator.languages[0] : navigator?.language ?? "en";
    return lang ? lang.substring(0, 2) : (choice ?? "en");
}
