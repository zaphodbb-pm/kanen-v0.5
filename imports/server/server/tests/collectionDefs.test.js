import assert from "assert";

import {allCollections} from '../Collections/collectionDefs'
const collections = Object.keys(allCollections);

describe("collections check", function () {

    it("check for 11 collections", function() {
        assert.strictEqual(collections.length, 11);
    });

    collections.forEach( coll => {
        it(`${coll} existence check`, function() {
            assert.strictEqual(allCollections[coll]["_name"], coll);
        });
    });
});