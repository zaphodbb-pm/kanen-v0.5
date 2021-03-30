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
 * @notes
 *  1. Install required testing files:
 *      meteor npm install --save-dev mocha
 *      meteor npm install --save-dev jsdom
 */


import assert from "assert";

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.mjs");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)

describe("Check Setup Files", function () {
    it("system version", async function () {
        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.2.5");
    });
});




//* add support functions
import {getTestFiles} from "../functions/getTestFiles.mjs";
import {testAssertions} from "../functions/testAssertions.mjs";


//* get all test files in a directory, import and execute tests
const testFileExtension = ".test.mjs";
//const dirFunctions = "/imports/functions"

const dirFunctions = "/imports/components/general/functions"

const testsFound = getTestFiles(dirFunctions, testFileExtension);

console.log(`'${dirFunctions}' test files found = `, testsFound.length);


describe("Run all tests", function () {
    it("get modules", async function(){
        for (const tf of testsFound) {
            try {
                const module = await import(tf);
                testAssertions(module);
            } catch(err){
                console.log("err", err);
            }
        }
    });
});
