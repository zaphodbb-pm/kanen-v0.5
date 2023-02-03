/* can only be run from app-test */

//import assert from "assert";

import {getDocs} from "../getDocs";

describe("function getDocs", function () {

  it("get document from collection sysConfig", async function () {
    let doc = await getDocs("sysConfig");

    console.log("doc", doc);

    //assert.ok(typeof lang === 'string' && lang.length === 2, `lang setting is: ${lang}`);
  });
});
