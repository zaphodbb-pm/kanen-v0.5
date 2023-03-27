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
    APP_NAME: "Svelte-Meteor Starter",                  // application name
    VERSION: "0.5.0",                                   // current version number
    LAST_UPDATE:  "Mar 27, 2023",                       // the most recent update date
    COPYRIGHT: `2021 - ${(new Date()).getFullYear()}`,  // adjustable copyright notice
}

