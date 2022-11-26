/**
 * Nav label for LogsUser page.
 *
 * @name logsUser_nav
 * @memberOf Pages:logsUser
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "User Logs"};

export const link = "/logsUser";

export const icon = "icon-bg-logs";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
