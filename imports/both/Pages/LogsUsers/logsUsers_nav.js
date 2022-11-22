/**
 * @summary Nav label for LogsUsers page.
 *
 * @memberOf Pages:logsUsers
 * @name logsUsers_nav
 * @lends logsUsers
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Users Logs"};

export const link = "/logsUsers";

export const icon = "icon-bg-logs";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
