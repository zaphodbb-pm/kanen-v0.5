/**
 * Route config information for AdminPanel.
 *
 * @function adminPanel_route
 * @memberOf Pages:adminPanel
 * @locus Client
 *
 * @returns {Object}
 */


import {getLang} from '../../../Functions/supportApplication/getLang';
import {i18n} from '../../../Functions/utilities/i18n';
import {nav, link, icon, roles} from './adminPanel_nav';
import Page from './adminPanel_loader.svelte';

let lang = getLang("en");


export default {
    name: link,                             // link that router will use
    roles: roles,
    component: Page,

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
