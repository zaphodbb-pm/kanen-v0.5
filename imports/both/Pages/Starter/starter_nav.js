/**
 * Nav label for Starter page.
 *
 * @name starter_nav
 * @memberOf Pages:starter
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Starter ListForm"};

export const link = "/starter-list-form";

export const icon = "icon-bg-list";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["pro", "siteAdmin"],
    write: ["siteAdmin"]
}
