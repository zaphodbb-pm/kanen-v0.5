/**
 * Nav label for Login page.
 *
 * @memberOf Pages:login
 * @name login_nav
 * @lends login
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Login"};

export const link = "/login";

export const icon = "icon-bg-login";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
