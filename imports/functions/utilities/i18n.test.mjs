/**
 * Test plan
 *
 * @memberof Tests
 * @augments i18n
 * @locus Anywhere
 *
 */


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
