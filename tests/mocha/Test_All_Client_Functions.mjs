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
 *
 *  2. Add "type": "module" to package.json file during testing; this preserves typescript checking for development
 *      Note that Node, Mocha and other packages don't deal well with ES6+ new functionality
 */

//* define directory to search for testplans
const dirFunctions = "/imports";
const testFileExtension = ".test.mjs";


//* get support functions
import assert from "assert";
import {getTestFiles} from "../functions/getTestFiles.mjs";
import {testAssertions} from "../functions/testAssertions.mjs";


//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.js");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)



describe("Check Setup Files", function () {
    it("system version", async function () {
        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.5.0");
    });
});


//* get all test files from designated directory
const testsFound = getTestFiles(dirFunctions, testFileExtension);
console.log(`'${dirFunctions}' test files found = `, testsFound.length);


//* cycle through all test plans
describe("Run all tests", function () {
    it("get modules", async function(){
        for (const tf of testsFound) {
            try {
                const testPlan = await import(tf);

                //* we need to use mjs extension to support es6 imports during Mocha testing
                //* note that mocha seems to have challenges with trying to use --package <path> directive
                const fileUnderTest = tf.replace(".test.mjs", ".js").replace("/tests", "");
                const functionUnderTest = tf.replace(".test.mjs", "").split("/").pop();
                const fut = await import(fileUnderTest);

                testAssertions(testPlan.testPlan, fut[functionUnderTest]);
            } catch(err){
                console.log("err", err);
            }
        }
    });
});
