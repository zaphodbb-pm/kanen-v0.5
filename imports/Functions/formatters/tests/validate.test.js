/* test data */
const data = [
  {item: 5 === 5, check: "isBoolean", result: true},
  {item: 5, check: "isBoolean", result: false},

  {item: 5, check: "isString", result: false},
  {item: "5", check: "isString", result: true},
  {item: "some long string", check: "shapeString", options: {max: 4}, result: "some"},

  {item: 11, check: "isNumber", result: true},
  {item: "11", check: "shapeNumber", options: {default: 5.1}, result: 5.1},
  {item: 11, check: "shapeNumber",  options: {min: 5}, result: 11},
  {item: 1,  check: "shapeNumber",  options: {min: 5}, result: 5},
  {item: 11, check: "shapeNumber",  options: {min: 5, max: 10}, result: 10},
  {item: 11, check: "shapeNumber",  options: {max: 10}, result: 10},
  {item: 1.123,  check: "shapeNumber",  options: {max: 10}, result: 1.123},

  {item: "text array", check: "isArray", result: false},
  {item: "text string", check: "shapeArray", options: {default: ["default"]}, result: ["default"]},
  {item: [1, 2, 3, 4], check: "isArray", result: true},
  {item: [1, 2, 3, 4], check: "shapeArray", options: {max: 2}, result: [1,2]},

  {item: "text object", check: "isObject", result: false},
  {item: {one: 2}, check: "isObject", result: true},
  {item: {one: 2}, check: "shapeObject", options: {default: {three: 4}}, result: {"three":4,"one":2}},

  {item: (field) => field + 2, check: "isFunction", result: true},
  {item: /sw/, check: "isRegexp", result: true},
  {item: new Date(), check: "isDate", result: true},
  {item: Symbol("123"), check: "isSymbol", result: true},
]


import assert from "assert";
import {validate} from "../validate";
describe("function validate", function () {
  data.forEach( (test, idx) => {
    it(`test ${idx + 1}: ${JSON.stringify(test.item)} / ${test.check} = ${ JSON.stringify(test.result) }`, function(){
      const result = validate[test.check](test.item, test.options);
      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });
});
