import assert from "assert";

import {adjustHexColor as underTest} from './adjustHexColor.mjs'

const label = "function adjustHexColor";

const testVals = [
    {test: "check for falsey values",  args: [undefined, undefined], result: {color: null, text: "#000000"}},
    {test: "check malformed colour value",  args: ["777777", 0], result: {color: null, text: "#000000"}},
    {test: "check for normal output", args: ["#777777", 0], result: {color: "#777777", text: "#FFFFFF"}},
    {test: "check for below minimum range", args: ["#777777", -120],  result: {color: "#000000", text: "#FFFFFF"}},
    {test: "check for above maximum range", args: ["#777777", 120],  result: {color: "#EEEEEE", text: "#000000"}},
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
