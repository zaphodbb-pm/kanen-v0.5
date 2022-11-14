/**
 * @summary Various content widgets WidgetsContent page.
 *
 * @memberOf Pages:widgetsContent
 * @name widgetsContent_nav
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Content"};

export const link = "/content-widgets";

export const icon = "icon-bg-folder";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
