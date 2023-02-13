/* test data */
const query = {
  name: "Test Doc",
  tenantId: "test",
  _id: "24LengthKey"
};

const user = {
  name: "Some User",
  admin: false,
  groups: "test",
  tenantId: "test",
  groupMaster: true
}

const admin = {
  name: "Admin",
  admin: true,
  groups: "test",
  tenantId: "test",
  groupMaster: false
}


const data = [
    {
      user: {...user, role: {_id: "standard", name: "Standard"} },
      roles: ["standard"],
      result: { name: 'Test Doc', tenantId: 'test', _id: "24LengthKey",  "null": { "$in": []} }
    },

  {
    user: {...user, role: {_id: "basic", name: "Basic"} },
    roles: ["standard"],
    result: null
  },

  {
    user: admin,
    roles: ["standard"],
    result: {"name":"Test Doc","tenantId":"test","_id":"24LengthKey","null":{"$in":[]}}
  },
]


import assert from "assert";
import {myDocuments} from "../myDocuments";

describe("function myDocuments", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.user.name} / ${test.user.role?.name ?? test.user.admin}`, function(){
      const result = myDocuments(query, test.user, test.roles);
      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });

});
