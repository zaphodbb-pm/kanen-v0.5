/* test data */
const data = [
  {length: undefined},
  {length: 8},
  {length: 48},
]


import assert from "assert";
import {generateId} from "../generateId";

describe("function generateId", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: length = ${test.length ?? 24}`, function(){
      const result = generateId(test.length);

      const pattern = new RegExp(/^[a-zA-Z0-9]*$/);
      const isAlhaNumeric = pattern.test(result);
      const isOk = typeof result === "string" && result.length === (test.length ?? 24)  && isAlhaNumeric;

      assert.ok(isOk, `Result was "${result}"`);
    });
  });

});
