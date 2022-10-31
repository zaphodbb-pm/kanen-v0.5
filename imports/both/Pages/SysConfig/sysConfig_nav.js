/**
 * @summary Nav label for SysConfig page.
 *
 * @memberof Pages:SysConfig
 * @name sysConfig_nav
 * @lends sysConfig
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "System Config"};

export const link = "/sysConfig";

export const icon = "icon-bg-cog";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["administrator"],
    write: ["administrator"]
}
