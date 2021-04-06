/**
 * Nav label for ChangePassword page.
 *
 * @memberof Pages:ChangePassword
 * @name changePassword_nav
 * @lends changePassword
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 *
 */

// @ts-ignore
import {getMeteorSettings} from "../../../functions_bypass/getMeteorSettings.mjs";

export const nav = {en: "Change Password"};

export const link = "/changePassword";

export const icon = "iconChangePwd";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
let demoMode = getMeteorSettings("demo_mode");

const normal = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}

const demo = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["siteAdmin"]
}

export const roles = demoMode ? demo : normal;
