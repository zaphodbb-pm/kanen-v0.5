import assert from "assert";

describe("svelte-meteor server check", function () {
  it("in server mode", function () {
    assert.strictEqual(Meteor.isServer, true);
    assert.strictEqual(Meteor.isClient, false);
  });
});
