import assert from "assert";

import {buildAllFields} from "../buildAllFields";
import {fieldAddons} from "../../fieldAddons";

/* sample test object */
let schema = [
  {
    field: "name",
    fieldType: "input",
  },

  {
    field: "hr1",
    fieldType: "hr",
  },
];

describe("function buildAllFields", function () {

  it("function buildAllFields", function () {
    let options = buildAllFields(schema, fieldAddons);

    assert.strictEqual(options.name, 1);
    assert.strictEqual(options.updatedAt, 1);
    assert.strictEqual(options.author, 1);
    assert.strictEqual(options.authorName, 1);
    assert.strictEqual(options.authorFullName, 1);
    assert.strictEqual(options.group, 1);
    assert.strictEqual(options.tenantId, 1);

    assert.strictEqual(options.hr1, undefined);
  });
});
