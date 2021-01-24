import assert from "assert";

import {numString} from '../formatters/numString.mjs'


describe("function numString", function () {
    it("normal formatting", function () {
        const out = numString(123456789.54);
        assert.strictEqual(out, "123,456,789.54");
    });

    it("number is falsey", function () {
        const out = numString(undefined);
        assert.strictEqual(out, "0");
    });

    it("not a number", function () {
        const out = numString({});
        assert.strictEqual(out, "0");
    });
});
