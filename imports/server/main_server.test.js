//import assert from "assert";

console.log("in main server test", Meteor.isServer, Meteor.isClient, Meteor.isTest, Meteor.isAppTest);


import './tests/server_1.test';

import '../both/tests/main_both.test'

/*
describe("svelte-meteor server", function () {
  if (Meteor.isServer) {

    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

 */
