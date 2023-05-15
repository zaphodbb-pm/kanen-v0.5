/* test data */
const doc = {
  username: "New_Test_Account",
  role: "basic",
  groups: "standard, test, general",
};

const updateDoc = {
  profile: {
    preference: "popsicle"
  }
}


/* imports */
import {Meteor} from "meteor/meteor";
import assert from "assert";

/* local variables */
let docId;


describe("methods for managing users", function () {
  it(`check for Google login service`, async function () {
    const result = await Meteor.callAsync("getServiceConfiguration", "google");
    assert.ok(result && result.service === "google", `Failed to get "google" service.`)
  });

  it(`check for "administrator" user account`, function () {
    let result = Meteor.users.find({}).fetch();
    result = result.filter( item => item.username === "administrator")[0];
    assert.ok(result, `Does not have an "administrator" account.`)
  });

  it(`method "userMgmtInsert"`, async function () {
    const result = await Meteor.callAsync("userMgmtInsert", doc);
    docId = result?._id ?? "";
    assert.ok(result && result.status === 200, `Failed to store user doc.`);
  });

  it(`method "getGroupMembers"`, async function () {
    const result = await Meteor.callAsync("getGroupMembers", docId);
    const test = result && Array.isArray(result) && (result.length > 0);
    assert.ok(test, `Failed to find user groups.`);
  });

  it(`method "userUpdateCredit"`, async function () {
    const result = await Meteor.callAsync("userUpdateCredit", 11);
    assert.ok(result && result.status === 200, `Failed to update user credits.`);
  });

  it(`method "userMgmtUpdate"`, async function () {
    const result = await Meteor.callAsync("userMgmtUpdate", docId, updateDoc);
    assert.ok(result && result.status === 200, `Failed to update user doc.`);
  });

  it(`method "userMgmtUpdateItem"`, async function () {
    const result = await Meteor.callAsync("userMgmtUpdateItem", "credits", 99);
    assert.ok(result && result.status === 200, `Failed to update user item.`);
  });

  it(`method "loadExtraFields"`, async function () {
    const result = await Meteor.callAsync("loadExtraFields");
    const keys = Object.keys(result);
    assert.ok(result && keys.length === 10, `Failed to retrieve user extra fields.`);
  });

  it(`method "userMgmtRemove"`, async function () {
    const result = await Meteor.callAsync("userMgmtRemove", docId);
    docId = "";
    assert.ok(result && result.status === 200, `Failed to remove user doc.`);
  });

});
