/**
 * Nav label for EditionsShow page.
 *
 * @name editionsShow_nav
 * @memberOf Pages:editionsShow
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Editions Read"};

export const link = "/editionsShow";

export const icon = "icon-bg-newspaper";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
