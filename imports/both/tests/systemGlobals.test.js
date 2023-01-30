import assert from "assert";
import {layout, documents} from '../systemGlobals';

describe("System Globals check", function () {
    it(`layout exists`, function() {
        assert.strictEqual(typeof layout, "object");

        assert.strictEqual(typeof layout.TOP_NAV, 'boolean');
        assert.strictEqual(typeof layout.SECONDARY_LOGO, 'boolean');
        assert.strictEqual(typeof layout.SHORTCUTS, 'boolean');
    });

    it(`documents exists`, function() {
        assert.strictEqual(typeof documents, "object");

        assert.strictEqual(typeof documents.LIMIT_MAX_SMALL, 'number');
        assert.strictEqual(typeof documents.MAX_IMAGE_SIZE, 'number');
        assert.strictEqual(typeof documents.LIMIT_AUTOCOMPLETE, 'number');
        assert.strictEqual(typeof documents.VALID_UNTIL, 'number');
    });
});





/*
export const layout = {
    TOP_NAV: false,                                 // turns off top nav bar links; side nav only
    SECONDARY_LOGO: false,                          // secondary logo support (optional)
    SHORTCUTS: true                                 // builds  short cut menu that is in Navbar; mobile has shortcuts at bottom
}

export const documents = {
    LIMIT_MAX_SMALL: 200,                           // smaller limit for document retrieval
    MAX_IMAGE_SIZE: 500 * 1024,                     // max size in bytes for an input file
    LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
    VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)
};
 */