/**
 * @summary Route config information for Home page.
 *
 * @memberof Pages:Home
 * @function home_route
 * @locus Client
 *
 * @returns {Object}
 */


import {getLang} from "../../../functions/supportApplication/getLang";
import {i18n} from "../../../functions/utilities/i18n";
import {nav, link, icon, roles} from './home_nav'

// @ts-ignore
import MainPage from "../../PageStructure/MainPage.svelte";
// @ts-ignore
import Page from "./home_loader.svelte"

let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    roles: roles,                           // roles that have access to this page

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
