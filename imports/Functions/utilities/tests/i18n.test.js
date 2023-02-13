/* test data */
const text = {
  en: "English",
  fr: "Français",
  es: "Españiol",

  items: {
    en: "English",
    fr: "Français",
    es: "Españiol",
  }
};

const data = [
  {text: text, lang: "en", result: "English"},
  {text: text, key: "items", lang: "fr", result: "Français"},
  {text: text, key: "items", lang: "ru", result: "English"},
]


import assert from "assert";
import {i18n} from "../i18n";

describe("function i18n", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: "${ test.lang }" with key "${test.key}" and result ${ JSON.stringify(test.result) }`, function(){
      const result = i18n(test.text, test.key, test.lang);

      assert.deepStrictEqual(result, test.result, `Result was ${test.result} not "${result}"`);
    });
  });

});
