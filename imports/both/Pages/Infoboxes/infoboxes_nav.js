/**
 * @summary Nav label for Infoboxes page.
 *
 * @memberof Pages:Infoboxes
 * @name infoboxes_nav
 * @lends infoboxes
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Infoboxes"};

export const link = "/infoboxes";

export const icon = "icon-bg-alert-info";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
