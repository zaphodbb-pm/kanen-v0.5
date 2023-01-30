import assert from "assert";

describe("Svelte-Meteor client check", function () {
  it("in client mode", function () {
    assert.strictEqual(Meteor.isServer, false);
    assert.strictEqual(Meteor.isClient, true);
  });
});
