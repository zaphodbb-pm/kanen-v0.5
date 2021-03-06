/**
 * Route config information for PubSub page.
 *
 * @memberof Pages:PubSub
 * @function pubSub_route
 * @locus Client
 * @augments pubSub
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/supportApplication/getLang'
import {i18n} from '/imports/functions/utilities/i18n'
import MainPage from '/imports/both/PageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './pubSub_nav'
import Page from './pubSub_loader.svelte'
//import Page from './pubSub.svelte'


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: roles,

    group: 2,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
