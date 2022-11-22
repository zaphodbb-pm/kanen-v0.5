/**
 * @summary Nav label for Documentation page.
 *
 * @name documentation_nav
 * @memberOf Pages:documentation
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Jsdoc"};

export const link = "/documentation";

export const icon = "icon-bg-code";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
