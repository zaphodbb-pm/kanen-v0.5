/**
 * @summary Nav label for LogsSystem page.
 *
 * @memberof Pages:LogsSystem
 * @name logsSystem_nav
 * @lends logsSystem
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "System Logs"};

export const link = "/logsSystem";

export const icon = "iconSysLogs";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
