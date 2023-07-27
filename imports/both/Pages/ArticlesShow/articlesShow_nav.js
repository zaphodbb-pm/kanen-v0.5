/**
 * Nav label for ArticlesShow page.
 *
 * @name articlesShow_nav
 * @memberOf Pages:articlesShow
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Articles Read"};

export const link = "/articlesShow";

export const icon = "icon-bg-newspaper";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
