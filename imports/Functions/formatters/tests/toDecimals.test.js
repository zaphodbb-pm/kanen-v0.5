/* test data */
const data = [
  {num: 11.5, digits: 0, result: 12},
  {num: 22.222, digits: 1, result: 22.2},
  {num: 333.3333, digits: 2, result: 333.33},
  {num: 4444.55555, digits: 3, result: 4444.556},
]


import assert from "assert";
import {toDecimals} from "../toDecimals";

describe("function toDecimals", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.num} / ${test.digits} = ${test.result}`, function(){
      const result = toDecimals(test.num, test.digits);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
