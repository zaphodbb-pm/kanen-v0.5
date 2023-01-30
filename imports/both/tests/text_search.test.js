import assert from "assert";
import fields from '../../client/text_search';

describe("Text_Common check", function () {
    let count = Object.keys(fields);

    it("check for 2 fields", function() {
        assert.strictEqual(count.length, 2);
    });

    count.forEach( item => {
        it(`${item} is object`, function() {
            assert.strictEqual(typeof fields[item], "object");
        });
    });
});