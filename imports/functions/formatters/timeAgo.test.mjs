import assert from "assert";

import {timeAgo as underTest} from './timeAgo.mjs'

const now = Date.now();
const nowFixed =  JSON.parse(JSON.stringify(now));

const label = "function timeAgo";

const testVals = [
    {test: "seconds ago", args: [new Date(now - 1000 * 10)], result: "10 seconds ago"},
    {test: "minutes ago", args: [new Date(now - 1000 * 180)], result: "3 minutes ago"},
    {test: "hours ago", args: [new Date(now - 1000 * 3600 * 4)], result: "4 hours ago"},
    {test: "days ago", args: [new Date(now - 1000 * 3600 * 24 * 2)],  result: "2 days ago"},
    {test: "months ago", args: [new Date(now - 1000 * 3600 * 24 * 60)],  result: "2 months ago"},
    {test: "years ago", args: [new Date(now - 1000 * 3600 * 24 * 31 * 12 * 2)], result: "2 years ago"},
];


describe(label, function () {
    testVals.forEach( tv => {
        it(tv.test, function () {
            const out = underTest(...tv.args);
            if(typeof tv.result === "object"){
                assert.deepStrictEqual(out, tv.result);
            }else{
                assert.strictEqual(out, tv.result);
            }
        });
    });

    it("check for mutation", function () {
        assert.strictEqual(nowFixed, now);
    });
});
