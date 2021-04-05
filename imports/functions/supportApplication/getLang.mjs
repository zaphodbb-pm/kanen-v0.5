/**
 * Finds a user's language preference
 *
 * @memberof Functions
 * @function getLang
 * @locus Client
 *
 * @returns {String} - two letter language code
 *
 */


export function getLang(choice){
    const navigator = window?.navigator ?? {};
    let lang = navigator?.languages ? navigator.languages[0] : navigator?.language ?? "en";
    return lang ? lang.substr(0, 2) : (choice ? choice : "en");
}
