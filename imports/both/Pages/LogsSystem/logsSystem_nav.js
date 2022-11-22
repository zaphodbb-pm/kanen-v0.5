/**
 * Nav label for LogsSystem page.
 *
 * @name logsSystem_nav
 * @memberOf Pages:logsSystem
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "System Logs"};

export const link = "/logsSystem";

export const icon = "icon-bg-logs";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
