import assert from "assert";

import { authors_acl} from '../specialACL';

describe("special accessControl check", function () {

    it(`authors_acl exists`, function() {
        assert.strictEqual(typeof authors_acl["authors"], "object");

        assert.strictEqual(typeof authors_acl["authors"]["coll"], 'string');
        assert.strictEqual(typeof authors_acl["authors"]["roles"], 'object');
        assert.strictEqual(typeof authors_acl["authors"]["listLong"], 'object');
    });
});