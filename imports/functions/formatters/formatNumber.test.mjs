import assert from "assert";

import {formatNumber as underTest} from './formatNumber.mjs'

const label = "function formatNumber";

const testVals = [
    {test: "undefined args", args: [undefined, undefined], result: "0.000"},
    {test: "single digit", args: [0, 5],  result: "0.000"},
    {test: "two digits", args: [9.45, 4],  result: "37.8"},
    {test: "three digits", args: [88.88, 3],  result: "267"},
    {test: "four digits", args: [777, 0.01],  result: "7.77"},
    {test: "five digits", args: [26666, 1], result: "26,666"},
];

describe(label, function () {
    testVals.forEach( tv => {
        it(tv.test, function () {
            const out = underTest(...tv.args);
            if(typeof tv.result === "object"){
                assert.deepStrictEqual(out, tv.result);
            }else{
                assert.strictEqual(out, tv.result);
            }
        });
    });
});
