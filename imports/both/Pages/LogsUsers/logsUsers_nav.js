/**
 * @summary Nav label for LogsUsers page.
 *
 * @memberof Pages:LogsUsers
 * @name logsUsers_nav
 * @lends logsUsers
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
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
