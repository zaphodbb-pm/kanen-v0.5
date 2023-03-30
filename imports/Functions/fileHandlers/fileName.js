/**
 * Creates file names with date and time stamp.
 *
 * @function fileName
 * @memberOf Functions:fileHandlers:
 * @locus Client
 *
 * @param {String} name - becomes prefix fragment of file name
 * @param {String} ext - file extension to add
 *
 * @return {string} - 'name_14May2018-14:50:21.ext' as a formatted and date stamped file name
 *
 */

export function fileName(name, ext) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const strMonth = month < 10 ? "0" + month.toString() : month;
    const hours = now.getHours();
    const strHours = hours < 10 ? "0" + hours.toString() : hours;
    const minutes = now.getHours();
    const strMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;

    const stamp = `${now.getFullYear()}-${strMonth}-${now.getDate()}T${strHours}_${strMinutes}`;
    return name + "_" + stamp + "." + ext;
}
