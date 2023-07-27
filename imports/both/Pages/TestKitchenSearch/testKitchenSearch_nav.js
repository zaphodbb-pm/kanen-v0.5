/**
 * Nav label for TestKitchenSearch page.
 *
 * @name testKitchenSearch_nav
 * @memberOf Pages:testKitchenSearch
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Test Kitchen"};

export const link = "/testKitchenSearch";

export const icon = "icon-bg-clipboard-check";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
