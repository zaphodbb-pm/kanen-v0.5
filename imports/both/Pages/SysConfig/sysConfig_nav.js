/**
 * Text for SysConfig page.
 *
 * @name sysConfig_nav
 * @memberOf Pages:sysConfig
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
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
