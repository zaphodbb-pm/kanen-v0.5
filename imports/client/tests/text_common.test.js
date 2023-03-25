import assert from "assert";
import fields from '../text_common';

describe("Text_Common check", function () {
    let count = Object.keys(fields);

    it("check for 5 fields", function() {
        assert.strictEqual(count.length, 5);
    });

    count.forEach( item => {
        it(`${item} is object`, function() {
            assert.strictEqual(typeof fields[item], "object");
        });
    });
});