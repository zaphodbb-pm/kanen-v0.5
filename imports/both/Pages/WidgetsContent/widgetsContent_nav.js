/**
 * @summary Nav label for Widgets Content page.
 *
 * @memberof Pages:WidgetsContent
 * @name widgetsContent_nav
 * @lends widgetsContent
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Tab Widgets"};

export const link = "/content-widgets";

export const icon = "iconContent";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
