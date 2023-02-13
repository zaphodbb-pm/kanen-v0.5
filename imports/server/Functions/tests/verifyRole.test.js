/* test data */
const roles = ["standard", "pro", "administrator"];

const user = {
  name: "Some User",
  admin: false,
  tenantId: "test",
}

const admin = {
  name: "Admin",
  admin: true,
  tenantId: "test",
}


const data = [
    {user: {...user, role: {_id: "basic", name: "Basic"} }, result: false },
    {user: {...user, role: {_id: "standard", name: "Standard"} }, result: true },
    {user: admin, result: true },
]


import assert from "assert";
import {verifyRole} from "../verifyRole";

describe("function verifyRole", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.user.name} / ${test.user.role?.name ?? test.user.admin}`, function(){

      const result = verifyRole(test.user, roles);

      assert.deepStrictEqual(result, test.result, `Result was "${result}", but should be "${test.result}"`);
    });
  });

});
