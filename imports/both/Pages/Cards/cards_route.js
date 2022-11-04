/**
 * @summary Route config information for Cards.
 *
 * @memberOf Pages:cards
 * @function cards_route
 * @locus Client
 *
 * @returns {Object}
 */


import {getLang} from '../../../functions/supportApplication/getLang';
import {i18n} from '../../../functions/utilities/i18n';
import {nav, link, icon, roles} from './cards_nav';
import Page from './cards_loader.svelte';


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    roles: roles,
    component: Page,

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),          // Navbar text to show
    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
