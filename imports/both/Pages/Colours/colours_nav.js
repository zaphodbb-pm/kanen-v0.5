/**
 * @summary Nav label for Colours page.
 *
 * @memberOf Pages:colours
 * @name colours_nav
 * @lends colours
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Colours"};

export const link = "/colours";

export const icon = "icon-bg-palette";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
