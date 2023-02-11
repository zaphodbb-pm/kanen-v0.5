/* test data */
const data = [
  {object: "string", result: "string"},
  {object: 1234, result: 1234},
  {object: {field: 111}, result: {field: 111}},
  {object: [{field: 111}], result: [{field: 111}] },
]

/*
@param {String} level - see below
@param {String} name - label to help identify / tag the console message
@param {Array} vrbl - list of in program variable to report on
@param {Array} label - labels to prefix variables for identification
@param {String} debugOptions - a string of options that have been turned on by system
 */


import assert from "assert";
import {debugConsole} from "../debugConsole";

describe("function debugConsole", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${ JSON.stringify(test.object) }`, function(){
      const result = debugConsole(test.object);

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
