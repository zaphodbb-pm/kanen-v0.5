/**
 * @summary Gets an object and finds text string based on user language preference.
 *
 * @memberof Functions
 * @function i18n
 * @locus Client
 *
 * @param {Object} allText - imported text object
 * @param {String} field - field in the main imported text object
 * @param {Writable<String>} lang - two letter language code
 *
 * @returns {String} - language translated text
 *
 */

export function i18n(allText, field, lang) {
    let out = "";
    let language = lang && typeof lang === "string" && lang.length === 2 ? lang : "en";

    if (allText && typeof allText === 'object') {
        if(field && typeof field === 'string'){
            out = allText[field] && allText[field][language] ? allText[field][language] : allText[field]["en"];
        }else{
            out = allText[language] ? allText[language] : allText[field]["en"];
        }
    }

    return out;
}




const text = {
    title: {
        en: "English",
        fr: "Francais",
        es: {label: "Espaniol"}
    }
}


export const testPlan = {
    label: "function i18n",

    tests: [
        {test: "get english",  args: [text, "title", "en"], result: text.title.en, type: "strictEqual"},
        {test: "get Francais", args: [text, "title", "fr"], result: text.title.fr, type: "strictEqual"},
        {test: "get Espaniol", args: [text, "title", "es"], result: text.title.es, type: "deepStrictEqual"},
        {test: "get unknown",  args: [text, "title", "ch"], result: text.title.en, type: "strictEqual"},
        {test: "no language",  args: [text, "title", undefined], result: text.title.en, type: "strictEqual"},
    ]
}
