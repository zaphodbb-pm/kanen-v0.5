/**
 * Allows you to do one unit test at a time.
 * This file is designed for use with Webstorm IDE and runs in its own node.js instance.
 *
 * @memberof Tests
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
 */


//* file to test: set directory and file file name to be used for testing;
//* assumes testPlan file has same name as function file name
const directory = "/imports/functions/formatters";
const functionUnderTest = "formatNumber";



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

const version = await import("../../imports/both/version.mjs");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)



//* build required paths to get a single test file in a directory, import and execute tests
const fileTestPlan = `${rpath}${directory}/${functionUnderTest}.test.mjs`;
const fileUnderTest = `${rpath}${directory}/${functionUnderTest}.js`;
const fileUnderTestES6 = `${rpath}/tests/mocha/${functionUnderTest}.mjs`;


//* run one test
describe("Run one test", function () {

    it("get module", async function(){
        try {
            const testPlan = await import(fileTestPlan);

            //* we need to use mjs extension to support es6 imports during Mocha testing
            //* note that mocha seems to have challenges with trying to use --package <path> directive
            fs.renameSync(fileUnderTest, fileUnderTestES6);
            const fut = await import(fileUnderTestES6);
            fs.renameSync(fileUnderTestES6, fileUnderTest);

            testAssertions(testPlan.testPlan, fut[functionUnderTest]);
        } catch(err){
            console.log("err", err);
        }
    });

});
