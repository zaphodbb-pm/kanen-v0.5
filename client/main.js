/**
 * Main entry point for client code.
 * All common routines are imported here.
 *
 * @namespace Client
 * @module
 * @memberOf Client:
 * @locus Client
 *
 * @notes
 *      1. Add language modifier to <html>.
 *      2. If available, add service worker to enable PWA
 *      3. Add sever console to client writer
 *      4. Launch Svelte starting point
 *
 */


//* load Meteor specific files
//import '../imports/both/Collections/collectionDefs';      // everything is controlled through methods

//* prepare to add PWA through service worker
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    /* add lang attribute to improve accessibility and SEO */
    let html = document.getElementsByTagName("html")[0];
    html.setAttribute("lang", "en");

    if('serviceWorker' in navigator){
        if(!navigator.serviceWorker.controller){

            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.info('service worker registered');
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error)
                })
        }
    }else{
        console.log("Service Worker is not supported in this browser");
    }
});


//* for dev / debug work: show server logs in client browser
import '../imports/Functions/utilities/showServerConsole';
global.serverConsole.subscribe();



//* load svelte framework
import App from '../imports/both/PageStructure/App.svelte';


new App({
    target: document.getElementById("svelte-app-top"),
});


