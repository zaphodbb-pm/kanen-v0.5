import assert from "assert";

import {parseJSONString as underTest} from './parseJSONString.mjs'

const label = "function parseJSONString";

const test1 = {one: 1, two: 2};
const test2 = [{one: 1}, {two: 2}];

const testVals = [
    {test: "normal object format", args: [JSON.stringify(test1), {} ], result: test1 },
    {test: "normal array format", args: [JSON.stringify(test2), {} ], result: test2},
    {test: "not valid JSON object", args: [undefined, {} ],  result: {}},
    {test: "not valid JSON array", args: [undefined, [] ],  result: []},
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
