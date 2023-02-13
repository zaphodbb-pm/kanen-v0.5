/* test data */
const data = [
  {state: "success", colour: "success"},
  {state: "warning", closable: false, colour: "warning"},
  {state: "fail", duration: 5, colour: "danger"},
  {state: "add", closable: true, duration: 10, colour: "secondary"},
  {state: "remove", closable: true, duration: 10, colour: "link"},
  {state: "uncertain", closable: true, duration: 10, colour: ""},
]

const iconFrags = {
  success: "alert-success",
  warning: "alert-warning",
  fail: "alert-danger",
  add: "circle-plus",
  remove: "circle-minus",
  uncertain: "help"
};


import assert from "assert";

import {msgDecoration} from "../messages/msgDecoration";

describe("function msgDecoration for component message", function () {

  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.state}; closable: ${test.closable ?? false}; duration: ${test.duration ?? 0}`, function(){

      const result = msgDecoration(test.state, test.closable, test.duration);

      const checkColour = result.colour?.includes(test.colour);
      const checkIcon = result.hasIcon && result.hasIcon.includes( iconFrags[test.state] ) ;
      const checkClosable = result.closable === (test.closable ?? true);
      const checkDuration = result.duration === (test.duration ?? 0);
      const checkResult = checkColour && checkIcon && checkClosable && checkDuration;

      assert.ok(checkResult, `Result was "${ JSON.stringify(result) }"`);
    });

  });
});
