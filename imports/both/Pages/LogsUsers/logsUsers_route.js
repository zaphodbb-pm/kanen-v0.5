/**
 * Route config information for LogsUsers page.
 *
 * @memberOf Pages:logsUsers
 * @function logsUsers_route
 * @locus Client
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '../../../functions/supportApplication/getLang';
import {i18n} from '../../../functions/utilities/i18n';
import {nav, link, icon, roles} from './logsUsers_nav';
import Page from './logsUsers_loader.svelte';


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    roles: roles,
    component: Page,

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),        // Navbar text to show
    group: 3,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
