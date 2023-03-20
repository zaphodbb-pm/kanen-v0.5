/* test data */
const doc = {
  _id:    "doc-id",
  name:   "Document Under Test",
};

const coll = "TestCollection";

const userInfo = {
  _id: "12345678",
  username: "Test User",
  profile: {name: "Test Jingle User"}
}

const extras = {
  tenantId: "Some Tenant"
};

let emitted;

const emit = function(type, state, doc){
  emitted = {
    type: type,
    state: state,
    doc: doc
  }

  return emitted;
};

const checkValue = {
  "type":"doc-submitted",
  "state":true,
  "doc":{
    _id: doc._id,
    name: doc.name,
    author: userInfo._id,
    authorName: userInfo.username,
    authorFullName: userInfo.profile.name,
    tenantId: extras.tenantId,
    sortName: doc.name.toLowerCase()
  }
}


import {Meteor} from "meteor/meteor";
import sinon from "sinon";
import assert from "assert";

import {submitForm} from "../func-submitForm";

describe("FormBuilder > formHolder - function submitForm", function () {

  it("returns result", function(){
    const user = sinon.stub(Meteor, 'user').returns(userInfo);
    const uid = sinon.stub(Meteor, 'userId').returns(userInfo._id);

    submitForm(doc, coll, false, true, emit, extras);

    assert.deepStrictEqual(emitted, checkValue, `Expected ${JSON.stringify(checkValue)}, found ${JSON.stringify(emitted)}`);

    user.restore();
    uid.restore();
  })

});
