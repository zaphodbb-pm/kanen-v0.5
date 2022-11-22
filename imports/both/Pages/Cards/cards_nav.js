/**
 * @summary Nav label for Cards page.
 *
 * @memberOf Pages:cards
 * @name cards_nav
 * @lends cards
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Cards"};

export const link = "/cards";

export const icon = "icon-bg-credit-card";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
