import assert from "assert";

import {adjustHexColor} from '../functions/adjustHexColor.mjs'

describe("function adjustHexColor", function () {
    it("check for normal output", function () {
        const outMid = adjustHexColor("#777777", 0);
        assert.strictEqual(outMid.color, "#777777");
        assert.strictEqual(outMid.text, "#FFFFFF");
    });

    it("check for below minimum range", function () {
        const outLow = adjustHexColor("#777777", -120);
        assert.strictEqual(outLow.color, "#000000");
        assert.strictEqual(outLow.text, "#FFFFFF");
    });

    it("check for above maximum range", function () {
        const outHigh = adjustHexColor("#777777", 120);
        assert.strictEqual(outHigh.color, "#EEEEEE");
        assert.strictEqual(outHigh.text, "#000000");
    });
});
