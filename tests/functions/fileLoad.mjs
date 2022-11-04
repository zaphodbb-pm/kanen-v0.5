/**
 * Loads an arbitrary file from the project directory.
 *
 * @memberOf Tests
 * @function fileLoad
 * @locus Server
 *
 * @param {string} file - file name with leading "/"
 * @param {Boolean} parse - if true, apply JSON.parse to file
 *
 * @module fileLoad
 */


//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const fs = require('fs');

export const fileLoad = function(file, parse){
    //* get full path to top of active code directory
    const rpath = fs.realpathSync("./");
    let out = fs.readFileSync(`${rpath}${file}`, "utf8");

    return parse ? JSON.parse(out) : out;
}
