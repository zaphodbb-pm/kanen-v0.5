/**
 * @summary Nav label for Users page.
 *
 * @memberof Pages:Users
 * @name users_nav
 * @lends users
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Users"};

export const link = "/users";

export const icon = "iconUsers";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["administrator"],
    write: ["administrator"]
}
