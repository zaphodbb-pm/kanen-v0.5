import assert from "assert";

import {buildAllFields} from "../buildAllFields";

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

  {
    field: "_id",
    fieldType: "id",
  },
];

let addons = {
  opt1: 1,
  opt2: 1
}

describe("function buildAllFields", function () {

  it("function buildAllFields", function () {
    let options = buildAllFields(schema, addons);

    assert.strictEqual(options.name, 1);
    assert.strictEqual(options.opt1, 1);
    assert.strictEqual(options.opt2, 1);

    assert.strictEqual(options.hr1, undefined);
    assert.strictEqual(options._id, undefined);
  });
});
