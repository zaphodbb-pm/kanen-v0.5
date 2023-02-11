/* test data */
const data = [
  {object: "string", result: "string"},
  {object: 1234, result: 1234},
  {object: {field: 111}, result: {field: 111}},
  {object: [{field: 111}], result: [{field: 111}] },
]


import assert from "assert";
import {deepClone} from "../deepClone";

describe("function deepClone", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${ JSON.stringify(test.object) }`, function(){
      const result = deepClone(test.object);

      /* mutate original object */
      if(typeof  test.object === "object"){
        if(Array.isArray(test.object)){
          test.object[0]["field"] = 222;
        }else{
          test.object["field"] = 222;
        }
      }

      assert.deepStrictEqual(result, test.result, `Result was not "${JSON.stringify(result)}"`);
    });
  });

});
