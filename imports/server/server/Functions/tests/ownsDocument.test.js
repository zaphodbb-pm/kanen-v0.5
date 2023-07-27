/* test data */
const doc = {
  name: "Test Doc",
  tenantId: "test",
  _id: "Doc_24LengthKey",
  author: "24ElementKey"
};

const user = {
  name: "Some User",
  admin: false,
  tenantId: "test",
};

const admin = {
  _id: "adminId",
  name: "Admin",
  admin: true,
};

const data = [
    { user: {...user,  _id: "otherId"}, result: false },
    { user: {...user,  _id: "24ElementKey"}, result: true },
    { user: admin, result: true },
];


import assert from "assert";
import {ownsDocument} from "../ownsDocument";

describe("function ownsDocument", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.user.name} / ${test.user._id}`, function(){
      const result = ownsDocument(test.user, doc);

      assert.deepStrictEqual(result, test.result, `Result was "${ JSON.stringify(result) }", but should be "${ JSON.stringify(test.result) }"`);
    });
  });

});
