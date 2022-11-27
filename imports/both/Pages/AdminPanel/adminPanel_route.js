/**
 * Route config information for AdminPanel.
 *
 * @name adminPanel_route
 * @constant {Object}
 * @memberOf Pages:adminPanel
 * @locus Client
 *
 * @property {Object}  route
 * @property {String}  route.name - link that router will use
 * @property {Object}  route.roles - {read: [String], write [String]}
 * @property {Object}  route.component - svelte module
 * @property {String}  route.icon - Navbar icon to show
 * @property {String}  route.label - Navbar text to show
 * @property {Number}  route.group - for side navigation; group routes into a block
 * @property {Boolean} route.isNavMobile -(optional) show link in mobile nav block at bottom or top
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes.js
 */


import {getLang} from '../../../Functions/application/getLang';
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
