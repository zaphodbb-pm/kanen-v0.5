import assert from "assert";

console.log("server 1 test");

describe("svelte-meteor server", function () {
  if (Meteor.isServer) {

    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
