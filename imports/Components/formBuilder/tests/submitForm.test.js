/* test data */
const doc = {
  _id:    "doc-id",
  name:   "Test User",
};

const coll = "TestCollection";

const extras = {
  tenantId: "Some Tenant"
};

const emit = function(type, state){
  console.log("emit", type, state);
};


//const tabLengths = [10,6, 4, 3 ];

import {submitForm} from "../func-submitForm";
//import schema from "./testing_form_schema";


import assert from "assert";
describe("component formHolder - function submitForm", function () {

  it("returns result", function(){
    const output = submitForm(doc, coll, false, true, emit, extras);

    console.log("output", output);

  })



  /*
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

   */

});
