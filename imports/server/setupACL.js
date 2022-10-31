/**
 * Server side setup of Access Control List for pages that try to store documents.
 *
 * @memberOf Structure:Server
 * @function setupACL
 * @locus Server
 *
 * @param {Object} starter_access_control
 * @param {Object} buildContent_access_control
 * @param {Object} learn_access_control
 * @param {Object} pubSub_access_control
 * @param {Object} users_access_control
 * @param {Object} logsSystem_access_control
 * @param {Object} logsUsers_access_control
 * @param {Object} notifications_acl
 *
 * @returns {Object} accessControl
 */

let acl = {};

//* load client accessible collections
import starter from '../both/Pages/Starter/starter_access_control'
import content from '../both/Pages/BuildContent/buildContent_access_control'
import learn from '../both/Pages/Learn/learn_access_control'
import pubSub from '../both/Pages/PubSub/pubSub_access_control'
import myProfile from '../both/Pages/MyProfile/myProfile_access_control'

acl = Object.assign(acl, starter, content, learn, pubSub, myProfile);

//* load sys admin accessible collections
import users from '../both/Pages/Users/users_access_control'
import sysConfig from '../both/Pages/SysConfig/sysConfig_access_control'
import logsSystem from '../both/Pages/LogsSystem/logsSystem_access_control'
import logsUsers from '../both/Pages/LogsUsers/logsUsers_access_control'

acl = Object.assign(acl, users, sysConfig,  logsSystem, logsUsers);


//* load special collections
import {notifications_acl, authors_acl} from './specialACL'

acl = Object.assign(acl, notifications_acl, authors_acl);


export const accessControl = acl;
