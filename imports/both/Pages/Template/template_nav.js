/**
 * Nav label, link, icon and access control for Template page.
 *
 * @name template_nav
 * @memberOf Pages:template
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


export const nav = {en: "Template"};

export const link = "/template";

export let query = "?desire=42";

export const icon = "icon-bg-layout";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
