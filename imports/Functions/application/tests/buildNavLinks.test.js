import assert from "assert";

import {allRoutes} from '../../../both/routes';
import {buildNavLinks} from "../buildNavLinks";


/* simulated user object */
const user = {
  general: {role: {_id: "general"} },
  subscriber: {role: {_id: "pro"}},
  siteAdmin: {role: {_id: "siteAdmin"}},
  admin: {role: {_id: "administrator"}, admin: true },
}

/* expected routes by user type */
const allUsers = ["/home", "/template", "/icons", "/colours", "/footerExtras", "/learn", "/cards", "/content-widgets", "/admin-panel", "/testing", "/login", "404"];
const subscriber = ["/pubSub","/my-profile","/changePassword", "/starter-list-form",];
const siteAdmin = ["/buildContent", "/documentation", "/logsSystem"];
const admin =  [ "/users","/sysConfig","/exportImport"];

const allSubscriber = [...allUsers, ...subscriber].sort();
const allSiteAdmin = [...allUsers, ...subscriber, ...siteAdmin].sort();
const allAdmin = [...allUsers, ...subscriber, ...siteAdmin, ...admin].sort();


describe("function buildNavLinks", function () {

  it(`general user nav links: ${allUsers.length}`, function () {
    let links = buildNavLinks(user.allUsers, allRoutes);
    let linkNames = links.map( link => link.name).sort();

    assert.strictEqual(linkNames.length, allUsers.length);
    assert.deepStrictEqual(linkNames, allUsers.sort());
  });

  it(`standard subscriber nav links: ${allSubscriber.length}`, function () {
    let links = buildNavLinks(user.subscriber, allRoutes);
    let linkNames = links.map( link => link.name).sort();

    assert.strictEqual(linkNames.length, allSubscriber.length);
    assert.deepStrictEqual(linkNames, allSubscriber);
  });

  it(`siteAdmin nav links: ${allSiteAdmin.length}`, function () {
    let links = buildNavLinks(user.siteAdmin, allRoutes);
    let linkNames = links.map( link => link.name).sort();

    assert.strictEqual(linkNames.length, allSiteAdmin.length);
    assert.deepStrictEqual(linkNames, allSiteAdmin);
  });

  it(`administrator nav links: ${allAdmin.length}`, function () {
    let links = buildNavLinks(user.admin, allRoutes);
    let linkNames = links.map( link => link.name).sort();

    assert.strictEqual(linkNames.length, allAdmin.length);
    assert.deepStrictEqual(linkNames, allAdmin);
  });
});