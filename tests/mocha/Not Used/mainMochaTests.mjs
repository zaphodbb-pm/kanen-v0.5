/**
 * Main entry point for Mocha based testing for a Meteor project.
 * This file is designed for use with Webstorm IDE and runs in its own node.js
 * instance.
 *
 * @memberof Tests
 * @function mainMochaTest
 * @locus Server
 *
 * @see {@link https://mochajs.org/#installation|for Mocha setup}
 * @see {@link https://www.jetbrains.com/help/webstorm/running-unit-tests-on-mocha.html#ws_mocha_before_you_start|for Webstorm config}
 *
 */


import assert from "assert";

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("node version", nodeV);


//* add support functions
import {doTest} from "../../functions/doTest.mjs"
import {getTestFiles} from "../../functions/getTestFiles.mjs";


describe("Check Setup Files", function () {
    it("system version", async function () {
        const version = await import("../../../imports/both/version.js");
        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.5.0");
    });
});


//* get all test files in a directory, import and execute tests
const testFileExtension = ".mjs";

//** tests for components
const dirComps = "/imports/components"
const testsComps = getTestFiles(dirComps, testFileExtension);

console.log(`'${dirComps}' test files found = `, testsComps.length);

testsComps.forEach( tc => {import(tc)});


//** tests for functions
const dirFunctions = "/imports/functions"
const testsFound = getTestFiles(dirFunctions, testFileExtension);

console.log(`'${dirFunctions}' test files found = `, testsFound.length);

testsFound.forEach( tf => doTest(tf));
