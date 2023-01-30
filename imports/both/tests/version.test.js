import assert from "assert";
import version from '../../both/version';

describe("Version check", function () {
    let count = Object.keys(version);

    it("check for 4 fields", function() {
        assert.strictEqual(count.length, 4);
    });

    count.forEach( ver => {
        it(`${ver} is string of length ${ver.length}`, function() {
            assert.strictEqual(typeof version[ver], "string");
        });
    });
});