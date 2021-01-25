import assert from "assert";


import {toDecimals} from './toDecimals.mjs'

describe("function toDecimals", function () {
    it("normal formatting", function () {
        const out = toDecimals(12345.678954, 2);
        assert.strictEqual(out, 12345.68);
    });

    it("not a number", function () {
        const out = toDecimals(undefined, 3);
        assert.strictEqual(out, 0.000);
    });

    it("negative digits", function () {
        const out = toDecimals(123.456789, -3);
        assert.strictEqual(out, 123.457);
    });
});
