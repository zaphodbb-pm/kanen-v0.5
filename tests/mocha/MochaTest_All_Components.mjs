/**
 * Main entry point for Mocha based testing for a Meteor project.
 * This file is designed for use with Webstorm IDE and runs in its own node.js instance.
 * This file loops thorugh all *.spec.mjs files to get and run Svelte component tests.
 *
 * @memberof Tests
 * @function MochaTest_All_Componnets
 * @locus Server
 *
 * @see {@link https://mochajs.org/#installation|for Mocha setup}
 * @see {@link https://www.jetbrains.com/help/webstorm/running-unit-tests-on-mocha.html#ws_mocha_before_you_start|for Webstorm config}
 *
 * @notes
 *  1. Install required testing files:
 *      meteor npm install --save-dev mocha
 *      meteor npm install dainte --save
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


//* get all test files in a directory, import and execute tests
const dirFunctions = "/imports"
const testFileExtension = ".spec.mjs";

const testsFound = getTestFiles(dirFunctions, testFileExtension);

console.log(`'${dirFunctions}' test files found = `, testsFound.length);


for (const tf of testsFound) {
    try {
        await import(tf);
    } catch(err){
        console.log("err", err);
    }
}
