/**
 * Route config information for FooterExtras page.
 *
 * @name footerExtras_route
 * @constant {Object}
 * @memberOf Pages:footerExtras
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
 *  1. File 'footerExtras_nav.js' holds navigation and associated text configuration information
 *  2. Client side: Remember to register footerExtras_route.js at /imports/both/routes.js
 *  3. Server side: if this page needs access to collections,
 *                  then register footerExtras_access_control at /imports/ server/setupACL.js
 *
 *
 */


import {getLang} from "../../../Functions/application/getLang";
import {i18n} from "../../../Functions/utilities/i18n";
import {nav, link, icon, roles, query} from './footerExtras_nav';
import Page from './footerExtras_loader.svelte';

let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    roles: roles,                           // roles that can see this link in Navbar and be routed to
    component: Page,

    query: query,                           // optional query string to append to url or dynamically added if needed
    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
