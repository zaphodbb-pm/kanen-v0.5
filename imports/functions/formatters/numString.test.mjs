import assert from "assert";

import {numString as underTest} from './numString.mjs'

const label = "function numString";

const testVals = [
    {test: "normal formatting", args: [123456789.54], result: "123,456,789.54"},
    {test: "number is falsey", args: [undefined],  result: "0"},
    {test: "not a number", args: [{}],  result: "0"},
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
