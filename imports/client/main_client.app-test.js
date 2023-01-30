// @ts-nocheck
import assert from "assert";

console.log("in main client full app test");


describe("svelte-meteor client app-test", function () {

    console.log("in describe app-test", Meteor.isClient, Meteor.isAppTest);

    it("server is client", function () {
      assert.strictEqual(Meteor.isClient, true);
    });
});

