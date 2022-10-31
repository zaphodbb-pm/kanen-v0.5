/**
 * @summary Nav label for WidgetsContent page.
 *
 * @memberof Pages:WidgetsContent
 * @name widgetsContent_nav
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Widgets"};

export const link = "/widgets";

export const icon = "icon-bg-folder";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
