/**
 * Gets an object and finds text string based on user language preference.
 *
 * @function i18n
 * @memberOf Functions:utilities:
 * @locus Client
 *
 * @param {Object} allText - imported text object
 * @param {String} field - field in the main imported text object
 * @param {string} lang - two letter language code
 *
 * @returns {String} - language translated text
 *
 */

export function i18n(allText, field, lang) {
    let out = "";
    let language = lang && typeof lang === "string" && lang.length === 2 ? lang : "en";

    if (allText && typeof allText === 'object') {
        if(field && typeof field === 'string' && allText[field]){
            out = allText[field] && allText[field][language] ? allText[field][language] : allText[field]["en"];
        }else{
            out = allText[language] ? allText[language] : (allText[field] ? allText[field]["en"] ?? "" : "");
        }
    }

    return out;
}
