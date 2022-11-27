/**
 * Executes assertion tests based on node.js assertion module.
 *
 * @function getTestFiles
 * @memberOf tests
 * @locus Server
 *
 * @param {string} dirTop - file path from project top to start looking for files
 * @param {string} extension - file name extension to look for
 *
 * @module getTestFiles
 */


//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);


export function getTestFiles(dirTop, extension) {
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
