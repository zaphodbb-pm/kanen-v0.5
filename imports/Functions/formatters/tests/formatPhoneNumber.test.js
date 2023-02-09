/* test data */
const data = [
  {num: "123456", result: ""},
  {num: "1234567", result: "() 123-4567"},
  {num: "5142340987", result: "(514) 234-0987"},
  {num: "14162340987", result: "+1 (416) 234-0987"},
  {num: "14162340987321", result: "+1 (416) 234-0987 x321"},
]


import assert from "assert";
import {formatPhoneNumber} from "../formatPhoneNumber";

describe("function formatPhoneNumber", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.num} = ${test.result}`, function(){
      const result = formatPhoneNumber(test.num, test.factor);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
