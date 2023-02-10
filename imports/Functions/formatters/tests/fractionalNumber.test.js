/* test data */
const data = [
  {num: 2.875, scale: "metric", result: "2.9"},
  {num: 2.875, scale: "imperial", result: "2 7/8"},
  {num: 10.25, scale: "imperial", result: "10 1/4"},
  {num: 8.55, scale: "imperial", result: "8 1/2"},
]


import assert from "assert";
import {fractionalNumber} from "../fractionalNumber";

describe("function fractionalNumber", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.num} / ${test.scale} = ${test.result}`, function(){
      const result = fractionalNumber(test.num, test.scale);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
