/**
 * @summary Nav label for BuildContent page.
 *
 * @memberof Pages:BuildContent
 * @name buildContent_nav
 * @lends buildContent
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Build Content"};

export const link = "/buildContent";

export const icon = "icon-bg-file";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
