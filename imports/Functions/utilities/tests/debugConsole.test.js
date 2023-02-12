/* test data */
const name = "Test of debugConsole";
const debugOptions = "ocefmprs";

const data = [
  {level: "k", label: ["One"], vrbl: [111], result: false},
  {level: "o", label: ["One"], vrbl: [111], result: "string"},
]


import assert from "assert";
import {debugConsole} from "../debugConsole";

describe("function debugConsole", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${ test.level } and result ${test.result}`, function(){
      const result = debugConsole(test.level, name, test.vrbl, test.label, debugOptions);
      let hasResult;

      if(typeof result === "string"){
        const hasHeader = result.includes("debug");
        const hasName = result.includes(name);
        const hasLabel = result.includes(test.label[0]);
        const hasValue = result.includes(test.vrbl[0]);
        hasResult = hasHeader && hasName && hasLabel && hasValue
      }else{
        const isBoolean = typeof result === "boolean";
        hasResult = isBoolean && result === test.result;
      }

      assert.ok(hasResult, `Result was not a ${test.result} as "${JSON.stringify(result)}"`);
    });
  });

});
