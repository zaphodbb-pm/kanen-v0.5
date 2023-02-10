/* test data */
const data = [
  {phone: 11, result: {filter: "", test: false}},
  {phone: "123", result: {filter: "123", test: false}},
  {phone: "2340987", result: {test:true, filter:"2340987"}},
  {phone: "15142340987", result: {test:true, filter:"15142340987"}},
  {phone: "15145671234ext22", result: {test:true, filter:"15145671234ext22"}},
  {phone: "1 (514) 567-1234 x22", result: {test:true, filter:"1 (514) 567-1234 x22"}},
]


import assert from "assert";
import {validatePhone} from "../validatePhone";

describe("function validatePhone", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.phone} = ${ JSON.stringify(test.result) }`, function(){
      const result = validatePhone(test.phone);
      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });

});
