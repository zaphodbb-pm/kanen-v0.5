/**
 * Route config information for Template page.
 *
 * @memberOf Pages:template
 * @function template_route
 * @locus Client
 *
 * @returns {Object} - {name, layout, component, icon, label, roles, group, isNavMobile}
 *
 * @notes
 *  1. File 'template_nav.js' holds navigation and associated text configuration information
 *  2. Client side: Remember to register template_route.js at /imports/both/routes
 *  3. Server side: if this page needs access to collections,
 *                  then register template_access_control at /imports/ server/setupACL.js
 */


import {getLang} from "../../../functions/supportApplication/getLang";
import {i18n} from "../../../functions/utilities/i18n";
import {nav, link, icon, roles, query} from './template_nav';
import Page from './template_loader.svelte';

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
