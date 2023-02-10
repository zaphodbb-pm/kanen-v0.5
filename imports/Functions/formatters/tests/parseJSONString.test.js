/* test data */
const data = [
  {string: "invalid JSON", default: [], result: [] },
  {string: '{"one":11}', default: {}, result: {"one":11} },
]


import assert from "assert";
import {parseJSONString} from "../parseJSONString";

describe("function parseJSONString", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.string}`, function(){
      const result = parseJSONString(test.string, test.default);
      assert.deepStrictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
