import assert from "assert";

import {notifications_acl, authors_acl} from '../specialACL';

describe("special accessControl check", function () {
    it(`notifications_acl exists`, function() {
        assert.strictEqual(typeof notifications_acl["notifications"], "object");

        assert.strictEqual(typeof notifications_acl["notifications"]["coll"], 'string');
        assert.strictEqual(typeof notifications_acl["notifications"]["roles"], 'object');
        assert.strictEqual(typeof notifications_acl["notifications"]["schemaLong"], 'object');
    });

    it(`authors_acl exists`, function() {
        assert.strictEqual(typeof authors_acl["authors"], "object");

        assert.strictEqual(typeof authors_acl["authors"]["coll"], 'string');
        assert.strictEqual(typeof authors_acl["authors"]["roles"], 'object');
        assert.strictEqual(typeof authors_acl["authors"]["listLong"], 'object');
    });
});