/**
 * Nav label, link, icon and access control for Testing page.
 *
 * @name testing_nav
 * @memberOf Pages:testing
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 *
 * @notes
 *  1. In order to reduce the initial bundle size, the nav label is in a separate text file.
 */


export const nav = {en: "Testing"};

export const link = "/testing";

export let query = "";

export const icon = "icon-bg-alert-warning";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
