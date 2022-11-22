/**
 * Nav label for Learn page.
 *
 * @memberOf Pages:learn
 * @name learn_nav
 * @lends learn
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 *
 */


export const nav = {en: "Learn"};

export const link = "/learn";

export const icon = "icon-bg-bookmark";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
