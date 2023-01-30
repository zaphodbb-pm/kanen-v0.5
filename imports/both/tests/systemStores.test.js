import assert from "assert";
import * as stores from '../../client/systemStores';

describe("Systems Stores check", function () {
    let count = Object.keys(stores);

    it("check for 9 fields", function() {
        assert.strictEqual(count.length, 9);
    });

    count.forEach( item => {
        it(`${item} is object`, function() {
            assert.strictEqual(typeof stores[item], "object");
        });
    });
});