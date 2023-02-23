/**
 * Links to be used for various roles for thissite.
 *
 * @function linkRoles
 * @locus anyWhere
 *
 * @property {Object} allUsers
 * @property {String} allSubscriber
 * @property {String} allSiteAdmin
 * @property {Object} allAdmin
 *
 */


const all = ["/home", "/template", "/icons", "/colours", "/footerExtras", "/learn", "/cards", "/content-widgets", "/admin-panel", "/testing", "/login"];
const subscriber = ["/pubSub","/my-profile","/changePassword", "/starter"];
const siteAdmin = ["/buildContent", "/documentation", "/logsSystem"];
const admin =  [ "/users","/sysConfig","/exportImport"];

export const allUsers = [...all].sort();
export const allSubscriber = [...allUsers, ...subscriber].sort();
export const allSiteAdmin = [...allUsers, ...subscriber, ...siteAdmin].sort();
export const allAdmin = [...allUsers, ...subscriber, ...siteAdmin, ...admin].sort();