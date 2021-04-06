/**
 * Gets Meteor public setting filed value.  This is needed to keep
 * typescript linting happy since it does not play well with meteor and global scopes.
 *
 * @memberof Functions_ByPass
 * @function getMeteorSettings
 * @locus Client
 *
 * @param {String} key - becomes prefix fragment of file name
 *
 * @returns {boolean|string} - value of setting field
 *
 */


import { Meteor } from 'meteor/meteor'

export function getMeteorSettings(key) {

    return Meteor.settings.public[key];
}
