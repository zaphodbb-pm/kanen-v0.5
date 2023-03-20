/* test data */
const config = {
  coll:       "starter",          // target collection to send submit to
  hasGroups:  true,               // allows fields to be grouped onto the same row
  hasTabs:    true,               // has tabbed fields in form
  tabLen:     4,
}

const tabLengths = [10, 4, 4, 1 ];

import {orgFields} from "../func-orgFields";
import schema from "./testing_form_schema";
import assert from "assert";
describe("FormBuilder > formHolder - function orgFields", function () {
  let defaults = {};

  schema.forEach(function (f) {
    defaults[f.field] = f.defaultValue;
  });

  it("array of grouped and tabbed fields", function(){
    const structure = orgFields(config, schema, defaults, "all");
    assert.strictEqual(structure.length, config.tabLen , `Result was "${structure.length}", but should be "${config.tabLen}"`);

    structure.forEach( (item,idx) => {
      assert.strictEqual(item.length, tabLengths[idx], `Tab ${idx} length was "${item.length}", but should be "${tabLengths[idx]}"`)
    });

  });

});
