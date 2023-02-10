/* test data */
const data = [
  {num: 11111, separator: ",", result: "11,111"},
  {num: 1111.22222, separator: ",", result: "1,111"},
  {num: 123456789.321, separator: ".", result: "123.456.789"},
]


import assert from "assert";
import {numString} from "../numString";

describe("function numString", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.num} with "${test.separator}" = ${test.result}`, function(){
      const result = numString(test.num, test.separator);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
