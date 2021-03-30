/**
 * @summary Creates file names with date and time stamp.
 *
 * @memberof Functions
 * @function fileName
 * @locus Client
 *
 * @param {String} name - becomes prefix fragment of file name
 * @param {String} ext - file extension to add
 * @return {string} - 'name_14May2018-14:50:21.ext' as a formatted and date stamped file name
 *
 */

export function fileName(name, ext) {
    const now = new Date();
    let month = now.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month;
    let hours = now.getHours();
    hours = hours < 10 ? "0" + hours.toString() : hours;
    let minutes = now.getHours();
    minutes = minutes < 10 ? "0" + minutes.toString() : minutes;

    const stamp = `${now.getFullYear()}-${month}-${now.getDate()}-${hours}_${minutes}`;
    return name + "_" + stamp + "." + ext;
}
