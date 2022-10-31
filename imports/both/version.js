/**
 * @summary System wide version constants.
 *
 * @memberOf Structure:Server
 * @function version
 * @locus Client
 *
 *
 * @property {Object}
 * @property {Object} default:
 * @property {String} APP_NAME
 * @property {String} VERSION
 * @property {String} LAST_UPDATE
 * @property {String} COPYRIGHT
 *
 * @returns {Object}
 *
 */

export default{
    APP_NAME: "Svelte-Meteor Starter",                  // application name
    VERSION: "0.5.0",                                   // current version number
    LAST_UPDATE:  "Nov 30, 2022",                     // the most recent update date
    COPYRIGHT: `2021 - ${(new Date()).getFullYear()}`,  // adjustable copyright notice
}

