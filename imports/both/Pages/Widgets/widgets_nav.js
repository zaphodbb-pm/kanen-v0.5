/**
 * @summary Nav label for Widgets page.
 *
 * @memberof Pages:Widgets
 * @name widgets_nav
 * @lends widgets
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Widgets"};

export const link = "/widgets";

export const icon = "iconWidget";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
