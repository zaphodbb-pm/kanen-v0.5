import assert from "assert";

import {formatPhoneNumber as underTest} from '../../imports/functions/formatters/formatPhoneNumber.mjs'

const label = "function formatPhoneNumber";

const testVals = [
    {test: "undefined args", args: [undefined], result: ""},
    {test: "not a string", args: [123],  result: ""},
    {test: "truncated phone number", args: ["123"],  result: ""},
    {test: "local number", args: ["6132340987"],  result: "(613) 234-0987"},
    {test: "partial full phone number", args: ["237890123"],  result: ""},
    {test: "full phone number", args: ["12378901234"], result: "+1 (237) 890-1234"},
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
