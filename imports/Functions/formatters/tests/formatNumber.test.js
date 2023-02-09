/* test data */
const data = [
  {num: 11, factor: 1, result: "11.0"},
  {num: 128, factor: 8, result: "1,024"},
  {num: 3456, factor: 77, result: "266,112"},
]


import assert from "assert";
import {formatNumber} from "../formatNumber";

describe("function formatNumber", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.num} * ${test.factor} = ${test.result}`, function(){
      const result = formatNumber(test.num, test.factor);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
