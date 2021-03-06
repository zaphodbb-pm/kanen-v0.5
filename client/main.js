/**
 * Main entry point for client code.
 * All common routines are imported here.
 *
 * @memberof Structure:Client
 * @function main
 * @locus Client
 *
 * @notes
 *      1. Meteor_extensions.js and themeFiles.scss are eagerly loaded at startup.
 *
 */


//* load Meteor specific files
import '/imports/both/collections'
import '/imports/both/AddOn_Packages/showServerConsole'


//* prepare to add PWA through service worker
import { Meteor } from 'meteor/meteor'

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
import '/imports/both/AddOn_Packages/showServerConsole'
serverConsole.subscribe();


//* load svelte framework
import App from '/imports/both/PageStructure/App.svelte'

new App({
    target: document.getElementnnnById("svelte-app-top"),
});
