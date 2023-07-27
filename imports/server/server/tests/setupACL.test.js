import assert from "assert";

import {accessControl} from '../setupACL';

describe("accessControl check", function () {
    let count = Object.keys(accessControl);

    it("check for 21 fields", function() {
        assert.strictEqual(count.length, 21);
    });


    count.forEach( field => {
        it(`${field} exists`, function() {
            assert.strictEqual(typeof accessControl[field], "object");

            let items = Object.keys(accessControl[field]);

            assert.strictEqual(items.length >= 2, true);
            assert.strictEqual(typeof accessControl[field]["coll"], 'string');
            assert.strictEqual(typeof accessControl[field]["roles"], 'object');

            assert.strictEqual(Array.isArray(accessControl[field]["roles"]["read"]), true);
            assert.strictEqual(Array.isArray(accessControl[field]["roles"]["write"]), true);
        });
    });


});


/* full access control layout
coll: 'starter',
roles: { read: [Array], write: [Array] },
listShort: null,
listMedium: null,
listLong: null,
listList: { name: 1, startImage: 1, startStaticSelect: 1, startDateTime: 1 },
schemaShort: null,
schemaMedium: null,
schemaLong: null,
schemaForm:
selects: null
 */