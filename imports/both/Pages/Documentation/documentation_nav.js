/**
 * @summary Nav label for Documentation page.
 *
 * @memberof Pages:Documentation
 * @name documentation_nav
 * @lends documentation
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Jsdoc"};

export const link = "/documentation";

export const icon = "icon-bg-code";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
