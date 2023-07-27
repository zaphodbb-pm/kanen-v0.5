/**
 * Nav label for NewsSearch page.
 *
 * @name newsSearch_nav
 * @memberOf Pages:newsSearch
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "News Read"};

export const link = "/newsSearch";

export const icon = "icon-bg-calendar";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
