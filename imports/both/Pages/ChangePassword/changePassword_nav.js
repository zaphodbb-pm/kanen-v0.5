/**
 * Nav label for ChangePassword page.
 *
 * @name changePassword_nav
 * @memberOf Pages:changePassword
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */

// @ts-ignore
import {getMeteorSettings} from "../../../functions_bypass/getMeteorSettings.mjs";

export const nav = {en: "Change Password"};

export const link = "/changePassword";

export const icon = "icon-bg-settings";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
let demoMode = getMeteorSettings("demo_mode");

const normal = {
    read: ["basic", "standard", "pro", "siteAdmin", "administrator"],
    write: ["basic", "standard", "pro", "siteAdmin", "administrator"]
}

const demo = {
    read: ["basic", "standard", "pro", "siteAdmin", "administrator"],
    write: ["siteAdmin", "administrator"]
}

export const roles = demoMode ? demo : normal;
