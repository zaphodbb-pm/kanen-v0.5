/* test data */
const data = [
  {str: "ONE",  result: "One"},
  {str: "one two",  result: "One Two"},
  {str: "ONE two tHree", result: "One Two Three"},
]


import assert from "assert";
import {capitalizeString} from "../capitalizeString";

describe("function capitalizeString", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.str} = ${test.result}`, function(){
      const result = capitalizeString(test.str);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
