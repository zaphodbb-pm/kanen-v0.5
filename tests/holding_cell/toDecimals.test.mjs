import assert from "assert";

import {toDecimals as underTest} from '../../imports/functions/formatters/toDecimals.mjs'

const label = "function toDecimals";

const testVals = [
    {test: "normal formatting", args: [12345.678954, 2], result: 12345.68},
    {test: "not a number", args: [undefined, 3],  result: 0.000},
    {test: "negative digits", args: [123.456789, -3],  result: 123.457},
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
