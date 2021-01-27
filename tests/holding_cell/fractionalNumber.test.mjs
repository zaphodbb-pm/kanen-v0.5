import assert from "assert";

import {fractionalNumber as underTest} from '../../imports/functions/formatters/fractionalNumber.mjs'

const label = "function fractionalNumber";

const testVals = [
    {test: "normal formatting", args: [1.125, "imperial"], result: "1 1/8"},
    {test: "not a number", args: [undefined, "imperial"], result: " "},
    {test: "metric number", args: [123.456789, "metric"], result: "123.5"},
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
