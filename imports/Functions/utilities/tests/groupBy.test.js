/* test data */
const data = [
  {obj: { aa: 11  }, key: "aa", result: {}},
  {obj: [11, 22, 33], key: "", result: {"undefined":[11,22,33]}},

  {obj: [
          {num: "11", cat: "one"},
          {num: "22", cat: "two"},
          {num: "33", cat: "one"}
      ],
    key: "cat",
    result: {"one":[{"num":"11","cat":"one"},{"num":"33","cat":"one"}],"two":[{"num":"22","cat":"two"}]} },
]


import assert from "assert";
import {groupBy} from "../groupBy";

describe("function groupBy", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: with key "${ test.key }" and result ${ JSON.stringify(test.result) }`, function(){
      const result = groupBy(test.obj, test.key);

      assert.deepStrictEqual(result, test.result, `Result was not "${JSON.stringify(result)}"`);
    });
  });

});
