/**
 * Finds a user's language preference
 *
 * @name systemStores
 * @memberOf App
 * @locus Client
 *
 * @property {Object} sysConfig - server derived: get certain system parameters for client side configuration
 * @property {Boolean} showWidget - sysConfig derived: show extra Components for dev, debug work
 * @property {String} sysDebug - sysConfig derived: string list of items that will log messages to the console
 *
 * @property {String} lang - browser derived: user language preference as a two letter code
 *
 * @property {Object} userPosition - browser derived: lat / lng co-ordinates
 * @property {Object} userLoggedIn - client derived: store variable gets returned Meteor.user() object at login
 * @property {Object} userExtras - server derived: logged in user gets their extra account information
 *
 * @property {Array} showRoutes - user filtered list of routes to show
 * @property {String} lastRoute - last viewed page before new page selected
 *
 * @property {String} messages - system comms channels
 *
 */

import {writable} from 'svelte/store'
//import {readable} from 'svelte/store'

//* set system parameters
export let sysConfig = writable( {} );
export let showWidget = writable( false );
export let sysDebug = writable( "" );

//* set language preference
import {getLang} from '../Functions/application/getLang.js'
export let lang = writable( getLang("en") );

//* set user stores
export let userPosition = writable( {} );
export let userExtras = writable( {} );
export let userLoggedIn = writable( null);

//* set extra route information
export let showRoutes = writable( [] );


//* build communication channels
export let messages = writable( [] );       // general messages to display
