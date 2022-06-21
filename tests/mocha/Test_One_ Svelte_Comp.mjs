/**
 * Allows you to do one unit test at a time.
 * This file is designed for use with Webstorm IDE and runs in its own node.js instance.
 * This file is wrapper to call up the actual test file 'tests/*.spec.mjs'
 *
 * @memberof Tests
 * @function Test_One_Svelte_Comp
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


//* load any required support files
import {fileAbsolutePath} from "../functions/fileAbsolutePath.mjs";

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.js");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)


//* get Svelte component under test (cut)
const file = "icon";                                    //******* define component test file name here
const directory = `/imports/components/elements`;
const path = `${directory}/${file}/tests`;
const spec = `${file}.spec.mjs`;
const cut = fileAbsolutePath(`${path}/${spec}`);

//** run component test
await import(cut);
