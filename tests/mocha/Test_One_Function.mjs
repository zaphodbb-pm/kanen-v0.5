/**
 * Allows you to do one unit test at a time.
 * This file is designed for use with Webstorm IDE and runs in its own node.js instance.
 *
 * @memberOf Tests
 * @function MochaTest_One_Function
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


//* file to test: set directory, subdirectory fragment and file name to be used for testing;
//* assumes testPlan file (in 'tests' folder) has same name as function file name

const directory = "/imports/both/Pages/Template";
const dirFragment = "/functions";
const functionUnderTest = "injectText";

//* get standard support functions
import {testAssertions} from "../functions/testAssertions.mjs";
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//* get full path to top of active code directory
const fs = require('fs');
const rpath = fs.realpathSync("./");


//* boiler plate header: track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.js");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)


//* build required paths to get a single test file in a directory, import and execute tests
const fileTestPlan = `${rpath}${directory}/tests${dirFragment}/${functionUnderTest}.test.mjs`;
const fileUnderTest = `${rpath}${directory}${dirFragment}/${functionUnderTest}.js`;


//* run one function's test plan; can have multiple tests in a plan
try {
    const testPlan = await import(fileTestPlan);
    const fut = await import(fileUnderTest);

    testAssertions(testPlan.testPlan, fut[functionUnderTest]);
} catch(err){
    console.log("err", err);
}
