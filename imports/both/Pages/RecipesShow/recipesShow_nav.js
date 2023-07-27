/**
 * Nav label for RecipesShow page.
 *
 * @name recipesShow_nav
 * @memberOf Pages:recipesShow
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Recipes Read"};

export const link = "/recipesShow";

export const icon = "icon-bg-file";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
