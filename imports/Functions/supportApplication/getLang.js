/**
 * Finds a user's language preference
 *
 * @memberOf Functions:supportApplication:
 * @function getLang
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
    return lang ? lang.substr(0, 2) : (choice ?? "en");
}
