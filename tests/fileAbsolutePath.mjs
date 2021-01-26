/**
 * Builds an absolute URL to a file.
 *
 * @memberof Tests
 * @function fileAbsolutePath
 * @locus Server
 *
 * @param {string} file - path and file name from project top including leading "/"
 *
 * @module fileAbsolutePath
 */


//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const fs = require('fs');

export const fileAbsolutePath = function(file){
    const rpath = fs.realpathSync("./");
    return `${rpath}${file}`;
}
