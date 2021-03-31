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


//* load any required support files
import {fileAbsolutePath} from "../functions/fileAbsolutePath.mjs";


//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("Node Version: ", nodeV);

const version = await import("../../imports/both/version.mjs");
console.log(`Project: ${version.default.APP_NAME} at version ${version.default.VERSION}`)


//* get Svelte component under test
const directory = '/imports/components/blocks'
const spec = "card.spec.mjs";        //******* define component test file here

const cut = fileAbsolutePath(`${directory}/${spec}`);


//** run component test
await import(cut);
