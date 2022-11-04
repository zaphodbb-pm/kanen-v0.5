/**
 * @summary Nav label for Starter page.
 *
 * @memberof Pages:Starter
 * @name starter_nav
 * @lends starter
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Starter ListForm"};

export const link = "/listForm";

export const icon = "icon-bg-list";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["pro", "siteAdmin"],
    write: ["siteAdmin"]
}
