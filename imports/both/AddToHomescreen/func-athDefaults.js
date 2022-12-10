/**
 * Default options list.
 *
 * @function athDefaults
 * @memberOf Footer
 * @locus Client
 *
 * @property {Object} defaultSession
 * @property {Object} athDefaults
 *
 */

import {athPrompts} from "./func-athPrompts";

export const defaultSession = {
    lastDisplayTime: 0, // last time we displayed the message
    returningVisitor: false, // is this the first time you visit
    displayCount: 0, // number of times the message has been shown
    optedout: false, // has the user opted out
    added: false, // has been actually added to the homescreen
    sessions: 0,
    nextSession: 0 //tie this to nextPrime Counter
};


export const athDefaults = {
    appID: "add-to-home-screen", // local storage name (no need to change)
    appName: "Svelte-Starter Progressive Web App",
    debug: false, // override browser checks
    logging: false, // log reasons for showing or not showing to js console; defaults to true when debug is true
    modal: false, // prevent further actions until the message is closed
    mandatory: false, // you can't proceed if you don't add the app to the homescreen
    autostart: false, // show the message automatically
    skipFirstVisit: false, // show only to returning visitors (ie: skip the first time you visit)
    minSessions: 0, //show only after minimum number of page views
    startDelay: 1, // display the message after that many seconds from page load
    lifespan: 15, // life of the message in seconds
    displayPace: 1440, // minutes before the message is shown again (0: display every time, default 24 hours)
    displayNextPrime: false,
    mustShowCustomPrompt: false,
    maxDisplayCount: 0, // absolute maximum number of times the message will be shown to the user (0: no limit)
    validLocation: [], // list of pages where the message will be shown (array of regexes)
    onInit: null, // executed on instance creation
    onShow: null, // executed when the message is shown
    onAdd: null, // when the application is launched the first time from the homescreen (guesstimate)
    onInstall: null,
    onCancel: null,
    customCriteria: null,
    manualPrompt: null,
    customPrompt: {}, //allow customization of prompt content
    athWrapper: ".ath-container",
    athGuidance: "ath-guidance",
    showClasses: [ "animated", "d-flex" ],
    showClass: "show-modal",
    hideClass: "hide-modal",
    promptDlg: {
        title: ".ath-banner-title",
        body: ".ath-banner",
        logo: ".ath-prompt-logo",
        cancel: ".btn-cancel-ath",
        install: ".btn-install-ath",
        action: {
            "ok": "Install",
            "cancel": "Not Now"
        }
    },

    prompt: athPrompts
}
