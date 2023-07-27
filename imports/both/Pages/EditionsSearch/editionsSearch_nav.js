/**
 * Nav label for EditionsSearch page.
 *
 * @name editionsSearch_nav
 * @memberOf Pages:editionsSearch
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Editions"};

export const link = "/editionsSearch";

export const icon = "icon-bg-book-open";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
