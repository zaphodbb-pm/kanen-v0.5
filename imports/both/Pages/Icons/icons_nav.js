/**
 * @summary Nav label for Icons page.
 *
 * @memberof Pages:Icons
 * @name icons_nav
 * @lends icons
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Icons"};

export const link = "/icons";

export const icon = "icon-bg-icons";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
