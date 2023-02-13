/* test data */
const data = [
  {obj: { aa: 11  }, key: "aa", result: []},
  {obj: [
          {num: "11", cat: "one"},
          {num: "22", cat: "two"},
          {num: "33", cat: "one"}
      ],
    key: "num",
    result: [{"num":"11","cat":"one"},{"num":"22","cat":"two"},{"num":"33","cat":"one"}] },

    {obj: [
            {num: "11", cat: "one"},
            {num: "22", cat: "two"},
            {num: "33", cat: "one"}
        ],
        key: "cat",
        dir: -1,
        result: [{"num":"22","cat":"two"},{"num":"11","cat":"one"},{"num":"33","cat":"one"}] },
]


import assert from "assert";
import {sortBy} from "../sortBy";

describe("function sortBy", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: with key "${ test.key }"`, function(){
      const result = sortBy(test.obj, test.key, test.dir);

      assert.deepStrictEqual(result, test.result, `Result was not "${JSON.stringify(result)}"`);
    });
  });

});
