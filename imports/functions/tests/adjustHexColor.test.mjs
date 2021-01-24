import assert from "assert";

import {adjustHexColor} from '../supportDOM/adjustHexColor.mjs'

describe("function adjustHexColor", function () {
    it("check for normal output", function () {
        const outMid = adjustHexColor("#777777", 0);
        assert.deepStrictEqual(outMid, {color: "#777777", text: "#FFFFFF"});
    });

    it("check for below minimum range", function () {
        const outLow = adjustHexColor("#777777", -120);
        assert.deepStrictEqual(outLow, {color: "#000000", text: "#FFFFFF"});
    });

    it("check for above maximum range", function () {
        const outHigh = adjustHexColor("#777777", 120);
        assert.deepStrictEqual(outHigh, {color: "#EEEEEE", text: "#000000"} );
    });
});
