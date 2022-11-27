/**
 * Server side setup of Access Control List for pages that try to store documents.
 *
 * @function setupACL
 * @memberOf Server:
 * @locus Server
 *
 * @property {Object} accessControl
 * @property {Object} accessControl.starter
 * @property {Object} accessControl.buildContent
 * @property {Object} accessControl.learn
 * @property {Object} accessControl.pubSub
 * @property {Object} accessControl.myProfile
 * @property {Object} accessControl.users
 * @property {Object} accessControl.logsSystem
 * @property {Object} accessControl.logsUser
 * @property {Object} accessControl.notifications
 * @property {Object} accessControl.authors
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
import logsUser from '../both/Pages/LogsUser/logsUser_access_control'

acl = Object.assign(acl, users, sysConfig,  logsSystem, logsUser);


//* load special collections
import {notifications_acl, authors_acl} from './specialACL'

acl = Object.assign(acl, notifications_acl, authors_acl);


export const accessControl = acl;
