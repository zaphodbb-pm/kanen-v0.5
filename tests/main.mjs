import assert from "assert";

describe("Check Setup Files", function () {


    it("system version", async function () {

        const version = await import("../imports/both/version.mjs");

        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.2.5");
    });

});


import '../imports/function_tests/adjustHexColor.test.mjs'
import '../imports/function_tests/numString.test.mjs'
