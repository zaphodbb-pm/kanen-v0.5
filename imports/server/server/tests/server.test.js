import assert from "assert";

import {Meteor} from "meteor/meteor";

describe("svelte-meteor server check", function () {
  it("in server mode", function () {
    assert.strictEqual(Meteor.isServer, true);
    assert.strictEqual(Meteor.isClient, false);
  });
});
