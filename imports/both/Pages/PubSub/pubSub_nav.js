/**
 * Nav labels for PubSub page.
 *
 * @name pubSub_nav
 * @memberOf Pages:pubSub
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Pub Sub"};

export const link = "/pubSub";

export const icon = "icon-bg-refresh";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}
