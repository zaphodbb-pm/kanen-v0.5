/* test data */
const data = [
  {date: Date.now() - 12346 ,  result: "12 seconds ago"},
  {date: Date.now() - 1234567 ,  result: "20 minutes ago"},
  {date: Date.now() - 123456789 ,  result: "1 day ago"},
  {date: Date.now() - 12345678901 ,  result: "4 months ago"},
  {date: Date.now() - 123456789012 ,  result: "3 years ago"},
]


import assert from "assert";
import {timeAgo} from "../timeAgo";

describe("function timeAgo", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.date} = ${test.result}`, function(){
      const result = timeAgo(test.date);
      assert.strictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
