/* sample test object */
const data = [
  {val: "2023-03-10", offset: 1},
  {val: "2023-03-10", offset: -1},
];

/* expected result object */
const checkQuery = [
  "2023-03-11",
  "2023-03-09",
];

import assert from "assert";
import {buildDate} from "../func-buildDate";
describe("ListCollections > filterPlugins - function buildDate", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.val} / offset=${test.offset}`, function(){
      let out = buildDate(test.val, test.offset);
      assert.deepStrictEqual(out, checkQuery[idx], `Result at index ${idx} was ${out}.`);
    });

  });
});
