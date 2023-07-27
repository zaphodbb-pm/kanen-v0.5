import assert from "assert";
import fields from '../text_common';

describe("Text_Common check", function () {
    let count = Object.keys(fields);

    it("check for 4 fields", function() {
        assert.strictEqual(count.length, 4);
    });

    count.forEach( item => {
        it(`${item} is object`, function() {
            assert.strictEqual(typeof fields[item], "object");
        });
    });
});