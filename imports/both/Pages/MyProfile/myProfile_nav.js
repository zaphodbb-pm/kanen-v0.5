/**
 * Nav label for MyProfile page.
 *
 * @memberof Pages:MyProfile
 * @name myProfile_nav
 * @lends myProfile
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
 */

// @ts-ignore
import {getMeteorSettings} from "../../../functions_bypass/getMeteorSettings.mjs";

export const nav = {en: "My Profile"};

export const link = "/my-profile";

export const icon = "icon-bg-user-plus";

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
