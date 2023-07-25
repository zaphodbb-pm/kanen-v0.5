/**
 * System wide version constants.
 *
 * @function version
 * @memberOf Client:
 * @locus Client
 *
 * @property {Object} default
 * @property {String} default.APP_NAME
 * @property {String} default.VERSION
 * @property {String} default.LAST_UPDATE
 * @property {String} default.COPYRIGHT
 *
 * @exports {Object}
 *
 */

export default{
    APP_NAME: "Requiem for Fine Cooking",               // application name
    VERSION: "1.0.0",                                   // current version number
    LAST_UPDATE:  "July 11, 2023",                      // the most recent update date
    COPYRIGHT: `2023 - ${(new Date()).getFullYear()}`,  // adjustable copyright notice
}

