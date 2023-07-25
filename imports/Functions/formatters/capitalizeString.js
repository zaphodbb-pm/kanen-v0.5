/**
 * Takes a string and returns a capitalized version of the string
 *
 * @function capitalizeString
 * @memberOf Functions:formatters:
 * @locus Anywhere
 *
 * @param {String} string
 *
 * @returns {String} - capitalized version
 */

export function capitalizeString(string) {
    let temp = string.replace(/\s+/g, " ");     // remove excess spaces between words
    let tempArray = temp.trimStart().toLowerCase().split(" ");   // convert to an array of words

    tempArray = tempArray.map( item => item.charAt(0).toUpperCase() + item.slice(1) );  // capitalize word
    return tempArray.join(" ");
}
