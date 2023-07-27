import assert from "assert";
import * as stores from '../systemStores';

describe("Systems Stores check", function () {
    let count = Object.keys(stores);

    it("check for 10 fields", function() {
        assert.strictEqual(count.length, 10);
    });

    count.forEach( item => {
        it(`${item} is object`, function() {
            assert.strictEqual(typeof stores[item], "object");
        });
    });
});