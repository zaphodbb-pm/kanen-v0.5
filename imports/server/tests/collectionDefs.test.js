import assert from "assert";

import {allCollections} from '../../both/collectionDefs'
const collections = Object.keys(allCollections);

describe("collections check", function () {

    it("check for 9 collections", function() {
        assert.strictEqual(collections.length, 9);
    });

    collections.forEach( coll => {
        it(`${coll} existence check`, function() {
            assert.strictEqual(allCollections[coll]["_name"], coll);
        });
    });
});