/**
 * Build system page routes.  Note that all pages need to be registered here.
 *
 * @name routes
 * @function routes
 * @memberOf ClientMain
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
import Template from './Pages/Template/template_route';
import Icons from './Pages/Icons/icons_route';
import Colours from './Pages/Colours/colours_route';
import MiniWiki from './Pages/Learn/learn_route';

import Cards from './Pages/Cards/cards_route';
import Tabs from './Pages/WidgetsContent/widgetsContent_route';
import AdminPanel from './Pages/AdminPanel/adminPanel_route';
import Starter from './Pages/Starter/starter_route';
import Login from './Pages/Login/login_route'

import MyProfile from './Pages/MyProfile/myProfile_route';
import ChangePassword from './Pages/ChangePassword/changePassword_route';
import PubSub from './Pages/PubSub/pubSub_route';

import BuildContent from './Pages/BuildContent/buildContent_route';
import Documentation from './Pages/Documentation/documentation_route';
import LogsSystem from './Pages/LogsSystem/logsSystem_route';
import LogsUsers from './Pages/LogsUsers/logsUsers_route';

import Users from "./Pages/Users/users_route";
import SysConfig from './Pages/SysConfig/sysConfig_route';
import ExportImport from './Pages/ExportImport/exportImport_route';



//* Load page route configurations into array for processing.
//* Note that array order determines the displayed nav link order.
const allRoutes = [

    Home,
    Template,
    Icons,
    Colours,
    MiniWiki,

    Cards,
    Tabs,
    AdminPanel,
    Starter,
    Login,

    MyProfile,
    ChangePassword,
    PubSub,

    BuildContent,
    Documentation,
    LogsSystem,
    LogsUsers,

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
