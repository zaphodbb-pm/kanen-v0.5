/* test data */
const data = [
  {email: 11, result: false},
  {email: "1234", result: false},
  {email: "abc@example.com", result: true},
  {email: "abc@example.", result: false},
  {email: "abc@", result: false},
  {email: "abc#example.com", result: false},
]


import assert from "assert";
import {validateEmail} from "../validateEmail";

describe("function validateEmail", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.email} = ${ JSON.stringify(test.result) }`, function(){
      const result = validateEmail(test.email);
      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });

});
