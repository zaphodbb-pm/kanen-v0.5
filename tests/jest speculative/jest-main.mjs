//import assert from "assert";

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("node version", nodeV);

//* add require function for getting modules
//import { createRequire } from 'module'
//const require = createRequire(import.meta.url);


function sum(a, b) {
    return a + b;
}



test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});




/*
describe("Check Setup Files", function () {
    it("system version", async function () {
        const version = await import("../imports/both/version.mjs");

        console.log("version", version);

        //assert.strictEqual(version.default.APP_NAME, "Kanen");
        //assert.strictEqual(version.default.VERSION, "0.2.5");
    });

});

*/


/*


//* get all test files in a directory, import and execute tests
const testFileExtension = ".test.mjs";

//** test functions
const directory = "/imports/functions"
const testsFound = getTestFiles(directory, testFileExtension);

console.log(`'${directory}' test files found = `, testsFound.length);

testsFound.forEach( tf => import(tf));





function getTestFiles(dirTop, extension) {
    let fs = require('fs');

    //* get full path to top of active code directory
    const rpath = fs.realpathSync("./");

    //* extract all test files from key directories
    return walk(rpath +  dirTop, extension);
}

*/

/*
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
*/
