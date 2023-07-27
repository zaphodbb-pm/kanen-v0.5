/* test data */
const data = [
  {field: "oneExists", result: {"oneExists": {$exists: true}} },
  {field: "one", value: 11, result: {"one":11} },
  {field: "two", value: 11, result: {"two":11} },
  {field: "three", value: {four: 44}, result: {"three": {four: 44}} },
]


import assert from "assert";
import {objectify} from "../objectify";

describe("function objectify", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.field}`, function(){
      const result = objectify(test.field, test.value);

      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });

});
