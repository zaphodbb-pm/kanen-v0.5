import assert from "assert";

console.log("in both test");

describe("svelte-meteor both", function () {

    it("client is not server two", function () {
      assert.strictEqual(Meteor.isServer, false);
    });

});
