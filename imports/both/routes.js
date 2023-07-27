/**
 * Build system page routes.  Note that all pages need to be registered here.
 *
 * @name routes
 * @function routes
 * @memberOf App
 * @locus Client
 *
 * @property {Object[]} allRoutes
 * @property {string} allRoutes[].name - link that router will use, ie "/home"
 * @property {Array} allRoutes[].roles - {read: array, write: array} - roles that can see this link in Navbar and be routed to, ie. ["all"]
 * @property {Object} allRoutes[].layout - MainPage layout Svelte object
 * @property {Object} allRoutes[].component - Page Svelte specific component
 *
 * @property {string} allRoutes[].icon - Navbar icon to show from global context (app page), ie. "iconLearn"
 * @property {string} allRoutes[].label - Navbar text to show, ie. i18n(PageText, "navLabel", lang)
 * @property {number} allRoutes[].group - For side navigation; group routes into a block
 * @property {boolean} allRoutes[].isNavMobile - (optional) show link in mobile nav block at bottom or top
 *
 * @returns {Array} - array of route objects
 *
 * @notes
 *  1. Route objects are located within the associated page directory under /imports/both/pages<pageName>
 *  2. The order of the page route objects in the returned array determines the page order
 *
 * @example
 *      Typical route object
 *          name =          {String} link that router will use, ie "/home"
 *          roles =         {Array} of objects: {read: array, write: array} - roles that can see this link in Navbar and be routed to, ie. ["all"]
 *          layout =        {Object} MainPage layout Svelte object
 *          component =     {Object} Page Svelte specific component
 *
 *          icon =          {String} Navbar icon to show from global context (app page), ie. "iconLearn"
 *          label =         {String} Navbar text to show, ie. i18n(PageText, "navLabel", lang)
 *          group =         {Number} for side navigation; group routes into a block
 *          isNavMobile =   {Boolean} (optional) show link in mobile nav block at bottom or top
 *
 */


//* get page configuration information
import Home from './Pages/Home/home_route';
import ArticlesSearch from "./Pages/ArticlesSearch/articlesSearch_route";
import ArticlesShow from "./Pages/ArticlesShow/articlesShow_route";

import RecipesSearch from "./Pages/RecipesSearch/recipesSearch_route";
import RecipesShow from "./Pages/RecipesShow/recipesShow_route";

import TestKitchenSearch from "./Pages/TestKitchenSearch/testKitchenSearch_route";
import TestKitchenShow from "./Pages/TestKitchenShow/testKitchenShow_route";

import CookingNowSearch from "./Pages/CookingNowSearch/cookingNowSearch_route";
import RecipeBox from "./Pages/RecipeBox/recipeBox_route";

import MagazinesSearch from "./Pages/MagazinesSearch/magazinesSearch_route";
import EditionsSearch from "./Pages/EditionsSearch/editionsSearch_route";
import EditionsShow from "./Pages/EditionsShow/editionsShow_route";
import NewsSearch from "./Pages/NewsSearch/newsSearch_route";

import Articles from './Pages/Articles/articles_route';
import Recipes from './Pages/Recipes/recipes_route';
import CookingNow from "./Pages/CookingNow/cookingNow_route";
import TestKitchen from './Pages/TestKitchen/testKitchen_route';
import Magazines from "./Pages/Magazines/magazines_route";
import Editions from "./Pages/Editions/editions_route";
import Books from "./Pages/Books/books_route";
import Favourites from "./Pages/Favourites/favourites_route";
import Notes from "./Pages/Notes/notes_route";
import Images from "./Pages/Images/images_route";
import Thumbnails from "./Pages/Thumbnails/thumbnails_route";
import News from "./Pages/News/news_route";

import Login from './Pages/Login/login_route';
import MyProfile from './Pages/MyProfile/myProfile_route';
import ChangePassword from './Pages/ChangePassword/changePassword_route';

import Users from "./Pages/Users/users_route";
import SysConfig from './Pages/SysConfig/sysConfig_route';
import ExportImport from './Pages/ExportImport/exportImport_route';




//* Load page route configurations into array for processing.
//* Note that array order determines the displayed nav link order.
const allRoutes = [

    Home,
    ArticlesSearch,
    RecipesSearch,
    TestKitchenSearch,
    CookingNowSearch,
    RecipeBox,

    ArticlesShow,
    RecipesShow,
    TestKitchenShow,
    MagazinesSearch,
    EditionsSearch,
    EditionsShow,
    NewsSearch,

    Articles,
    Recipes,
    CookingNow,
    TestKitchen,
    Magazines,
    Editions,
    Books,
    Favourites,
    Notes,
    Images,
    Thumbnails,
    News,

    MyProfile,
    Login,
    ChangePassword,

    Users,
    SysConfig,
    ExportImport,

    //* not found or 404 page is redirected to home page
    {
        name: '404',
        path: '404',
        redirectTo: '/home',
        roles: {                                // roles that can see this link in Navbar and be routed to
            read: ["all"],
            write: ["none"]
        },
    }
];

export {allRoutes};
