/**
 * Nav label, link, icon and access control for Template page.
 *
 * @memberOf Pages:template
 * @name template_nav
 * @lends template
 * @locus Anywhere
 *
 * @exports {Object} nav
 * @exports {String} link
 * @exports {String} query
 * @exports {String} icon
 * @exports {Object} roles - {read: [], write: []}
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
