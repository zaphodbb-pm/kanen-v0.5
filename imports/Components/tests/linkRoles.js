/**
 * Links to be used for various roles for thissite.
 *
 * @function linkRoles
 * @locus anyWhere
 *
 * @property {Object} allUsers
 * @property {String} allSubscriber
 * @property {String} allSiteAdmin
 * @property {Object} allAdmin
 *
 */


const all = ["/articlesSearch", "/articlesShow", "/cookingNowSearch", "/home",  "/login", "/magazinesSearch",
    "/newsSearch", "/recipesSearch", "/recipesShow", "/testKitchenSearch", "/testKitchenShow"]

const subscriber = ["/changePassword", "/my-profile", "/recipeBox"];
const siteAdmin = ["/articles-edit", "/cookingNow-edit", "/favourites-edit", "/magazines-edit", "/news-edit", "/recipes-edit", "/testKitchen-edit"];
const admin =  [ "/users","/sysConfig","/exportImport"];

export const allUsers = [...all].sort();
export const allSubscriber = [...allUsers, ...subscriber].sort();
export const allSiteAdmin = [...allUsers, ...subscriber, ...siteAdmin].sort();
export const allAdmin = [...allUsers, ...subscriber, ...siteAdmin, ...admin].sort();