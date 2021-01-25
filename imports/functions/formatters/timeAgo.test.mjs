import assert from "assert";


import {timeAgo} from './timeAgo.mjs'

const now = Date.now();
const nowFixed =  JSON.parse(JSON.stringify(now));

describe("function timeAgo", function () {
    it("seconds ago", function () {
        const out = timeAgo( new Date(now - 1000 * 10) );
        assert.strictEqual(out, "10 seconds ago");
    });

    it("minutes ago", function () {
        const out = timeAgo( new Date(now - 1000 * 180) );
        assert.strictEqual(out, "3 minutes ago");
    });

    it("hours ago", function () {
        const out = timeAgo( new Date(now - 1000 * 3600 * 4) );
        assert.strictEqual(out, "4 hours ago");
    });

    it("days ago", function () {
        const out = timeAgo(new Date(now - 1000 * 3600 * 24 * 2) );
        assert.strictEqual(out, "2 days ago");
    });

    it("months ago", function () {
        const out = timeAgo(new Date(now - 1000 * 3600 * 24 * 60) );
        assert.strictEqual(out, "2 months ago");
    });

    it("years ago", function () {
        const out = timeAgo(new Date(now - 1000 * 3600 * 24 * 31 * 12 * 2) );
        assert.strictEqual(out, "2 years ago");
    });

    it("check for mutation", function () {
        assert.strictEqual(nowFixed, now);
    });
});
