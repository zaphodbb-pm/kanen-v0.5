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

//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);


describe("Check Setup Files", function () {
    it("system version", async function () {
        const version = await import("../imports/both/version.mjs");
        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.2.5");
    });
});


//* get all test files in a directory, import and execute tests
const testFileExtension = ".test.mjs";

//** tests for components
const dirComps = "/imports/components"
const testsComps = getTestFiles(dirComps, testFileExtension);

console.log(`'${dirComps}' test files found = `, testsComps.length);

testsComps.forEach( tc => {import(tc)});


//** tests for functions
const dirFunctions = "/imports/functions"
const testsFound = getTestFiles(dirFunctions, testFileExtension);

console.log(`'${dirFunctions}' test files found = `, testsFound.length);

testsFound.forEach( tf => import(tf));



//*************** support functions ************

//* get test files in a target directory
function getTestFiles(dirTop, extension) {
    let fs = require('fs');

    //* get full path to top of active code directory
    const rpath = fs.realpathSync("./");

    //* extract all test files from key directories
    return walk(rpath +  dirTop, extension);
}


//* recursively walk a directory for test files
function walk(dir, extension) {
    let fs = require('fs');

    let results = [];
    let list = fs.readdirSync(dir);

    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            //* Recurse into a subdirectory
            results = results.concat(walk(file, extension));
        } else {
            //* Is a file
            if(file.includes(extension)){
                results.push(file);
            }
        }
    });
    return results;
}
