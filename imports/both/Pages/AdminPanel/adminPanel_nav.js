/**
 * @summary Nav label for AdminPanel page.
 *
 * @memberOf Pages:adminPanel
 * @name adminPanel_nav
 * @lends adminPanel
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Admin"};

export const link = "/admin-panel";

export const icon = "icon-bg-alert-info";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
