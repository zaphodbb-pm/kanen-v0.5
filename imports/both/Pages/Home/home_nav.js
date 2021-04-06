/**
 * @summary Nav label for Home page.
 *
 * @memberof Pages:Home
 * @name home_nav
 * @lends home
 * @locus Anywhere
 *
 * @exports {Object} - {nav}
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Home"};

export const link = "/home";

export const icon = "iconHome";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
