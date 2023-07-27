/* test data */

/* imports */
import assert from "assert";
import {getOSinfo} from "../getOsInfo";

describe("function getOSinfo", function () {

  it(`verify fields`, function(){
    const result = getOSinfo();

    let fields = [];

    if(typeof result === "object"){
      fields = Object.keys(result);
    }

    assert.strictEqual(fields.length, 15, `Result was "${fields.length}" fields"`);
  });

});