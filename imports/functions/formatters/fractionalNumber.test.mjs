import assert from "assert";


import {fractionalNumber} from './fractionalNumber.mjs'

describe("function fractionalNumber", function () {
    it("normal formatting", function () {
        const out = fractionalNumber(1.125, "imperial");
        assert.strictEqual(out, "1 1/8");
    });

    it("not a number", function () {
        const out = fractionalNumber(undefined, "imperial");
        assert.strictEqual(out, " ");
    });

    it("metric number", function () {
        const out = fractionalNumber(123.456789, "metric");
        assert.strictEqual(out, "123.5");
    });
});
