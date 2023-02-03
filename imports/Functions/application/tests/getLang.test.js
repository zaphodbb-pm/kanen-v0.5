import assert from "assert";

import {getLang} from "../getLang";

describe("function getLang", function () {

  it("checking window.navigator.languages", function () {
    let lang = getLang("ch");

    assert.ok(typeof lang === 'string' && lang.length === 2, `lang setting is: ${lang}`);
  });
});
