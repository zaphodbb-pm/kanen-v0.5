/* test data */
const data = [
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "", result: null},
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "aa", result: 11},
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "bb", result: { cc: 33, dd: {ee: 33}}},
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "bb.cc", result: 33},
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "bb.dd", result: {ee: 33} },
  {obj: { aa: 11, bb: { cc: 33, dd: {ee: 33}}  }, key: "bb.dd.ee", result: 33},
  {obj: [{aa: 11}, {bb: 22}], key: "aa", result: null},
]


import assert from "assert";
import {dotNotation} from "../dotNotation";

describe("function dotNotation", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: with key "${ test.key }" and result ${ JSON.stringify(test.result) }`, function(){
      const result = dotNotation(test.obj, test.key);

      assert.deepStrictEqual(result, test.result, `Result was not a ${test.result} as "${JSON.stringify(result)}"`);
    });
  });

});
