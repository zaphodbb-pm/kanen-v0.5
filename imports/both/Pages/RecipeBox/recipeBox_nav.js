/**
 * Nav label for recipeBox page.
 *
 * @name recipeBox_nav
 * @memberOf Pages:recipeBox
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Recipe Box"};

export const link = "/recipeBox";

export const icon = "icon-bg-archive";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}
