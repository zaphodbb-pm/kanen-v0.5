/**
 * Nav label for PubSub page.
 *
 * @memberOf Pages:pubSub
 * @name pubSub_nav
 * @lends pubSub
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Pub Sub"};

export const link = "/pubSub";

export const icon = "icon-bg-refresh";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}
