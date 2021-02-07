/**
 * Allows you to do one unit test at a time.
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
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//* get full path to top of active code directory
let fs = require('fs');
const rpath = fs.realpathSync("./");

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.mjs");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)

//* add support functions
import {doTest} from "../functions/doTest.mjs"

import {testAssertions} from "../functions/testAssertions.mjs";

//* get a single test files in a directory, import and execute tests
const directory = "/imports/functions/utilities"
const file = "sortBy.mjs";



describe("Run one test", function () {

    it("get module", async function(){
        try {
            const module = await import(`${rpath}${directory}/${file}`);
            testAssertions(module);
        } catch(err){
            console.log("err", err);
        }
    });
});
