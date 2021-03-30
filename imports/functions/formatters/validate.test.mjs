/**
 * Test plan
 *
 * @memberof Tests
 * @augments validate
 * @locus Anywhere
 *
 */


import {validate as underTest} from "./validate.mjs";
export const validate = underTest;


//* test data for plans
const now = new Date();
const sym = Symbol("sym");
const re = new RegExp('ab+c', 'i');
const testFunc = (a) => a + 1;
const obj = {a: 1, b: 2, c: 3};
const obj2 = {c: 44, d: 22, e: 66}

const opts2 = {min: 6, max: 9, warn: true}
const opts3 = {min: 3, max: 10}
const opts5 = {min: 3, max: 4}


//* test plans to be used by Mocha
export const testPlan = {
    label: "function validate",

    tests:  [
        {test: "normal true boolean",   function: "isBoolean",      type: "strictEqual",        args: [true],           result: true},
        {test: "normal false boolean",  function: "isBoolean",      type: "strictEqual",        args: [false],          result: true},
        {test: "undefined boolean",     function: "isBoolean",      type: "strictEqual",        args: [undefined],      result: false},

        {test: "normal string",         function: "isString",       type: "strictEqual",        args: ["is a string"],  result: true},
        {test: "default string",        function: "isString",       type: "strictEqual",        args: [undefined],      result: false},
        {test: "null string",           function: "isString",       type: "strictEqual",        args: [null],           result: false},
        {test: "shape normal string",   function: "shapeString",    type: "strictEqual",        args: ["is a very long string", opts2],  result: "is a very"},
        {test: "shape short string",    function: "shapeString",    type: "strictEqual",        args: ["short", opts2], result: undefined, },

        {test: "normal number",         function: "isNumber",       type: "strictEqual",        args: [4],              result: true},
        {test: "null number",           function: "isNumber",       type: "strictEqual",        args: [null],           result: false},
        {test: "below min number",      function: "shapeNumber",    type: "strictEqual",        args: [1, opts3],       result: 3},
        {test: "above max number",      function: "shapeNumber",    type: "strictEqual",        args: [15, opts3],      result: 10, },

        {test: "normal array",          function: "isArray",        type: "deepStrictEqual",    args: [ [1,2]],         result: true},
        {test: "null array",            function: "isArray",        type: "deepStrictEqual",    args: [ null],          result: false},
        {test: "short array",           function: "shapeArray",     type: "deepStrictEqual",    args: [ [1, 2], opts5], result: undefined},
        {test: "long array",            function: "shapeArray",     type: "deepStrictEqual",    args: [ [3, 4, 5, 6, 7], opts5], result: [3, 4, 5, 6], },

        {test: "normal object",         function: "isObject",       type: "deepStrictEqual",    args: [obj, {keys: ["a", "b", "c"]}],       result: true},
        {test: "object missing keys",   function: "isObject",       type: "deepStrictEqual",    args: [obj, {keys: ["a", "b", "c", "d"]}],  result: false},
        {test: "not a object",          function: "isObject",       type: "deepStrictEqual",    args: [4],                          result: false},
        {test: "shape object",          function: "shapeObject",    type: "deepStrictEqual",    args: [obj2, {default: obj}],       result: {...obj, ...obj2}, },
        {test: "shape not a object",    function: "shapeObject",    type: "deepStrictEqual",    args: [4, {default: obj}],          result: obj, },

        {test: "normal function",       function: "isFunction",     type: "deepStrictEqual",    args: [testFunc],               result: true, },
        {test: "not a function",        function: "isFunction",     type: "deepStrictEqual",    args: [4],                      result: false, },
        {test: "shape function",        function: "shapeFunction",  type: "deepStrictEqual",    args: [testFunc],               result: testFunc, },
        {test: "shape not a function",  function: "shapeFunction",  type: "deepStrictEqual",    args: [4, {default: testFunc}], result: testFunc, },

        {test: "normal regexp",         function: "isRegexp",       type: "deepStrictEqual",    args: [re],                 result: true, },
        {test: "not a regexp",          function: "isRegexp",       type: "deepStrictEqual",    args: [23],                 result: false, },
        {test: "shape regexp",          function: "shapeRegexp",    type: "deepStrictEqual",    args: [re],                 result: re, },
        {test: "shape is not a regexp", function: "shapeRegexp",    type: "deepStrictEqual",    args: [ 34, {default: re}], result: re, },

        {test: "normal date",           function: "isDate",         type: "strictEqual",        args: [now],                result: true, },
        {test: "not a date",            function: "isDate",         type: "strictEqual",        args: [44],                 result: false, },
        {test: "shape date",            function: "shapeDate",      type: "deepStrictEqual",    args: [now],                result: now, },
        {test: "shape not a date",      function: "shapeDate",      type: "deepStrictEqual",    args: [45, {default: now}], result: now, },

        {test: "normal symbol",         function: "isSymbol",       type: "deepStrictEqual",    args: [sym],                result: true, },
        {test: "not a symbol",          function: "isSymbol",       type: "deepStrictEqual",    args: [4],                  result: false, },
        {test: "shape symbol",          function: "shapeSymbol",    type: "deepStrictEqual",    args: [sym],                result: sym, },
        {test: "shape not a symbol",    function: "shapeSymbol",    type: "deepStrictEqual",    args: [4, {default: sym}],  result: sym, },
    ]
}
