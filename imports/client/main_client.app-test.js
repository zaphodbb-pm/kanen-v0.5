// @ts-nocheck
import assert from "assert";

console.log("in main client test", Meteor.isServer, Meteor.isClient, Meteor.isTest, Meteor.isAppTest);


describe("svelte-meteor server", function () {

    it("server is client", function () {
      assert.strictEqual(Meteor.isClient, true);
    });
});

