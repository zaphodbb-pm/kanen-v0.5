/* step 1: define component key parts */
const compName = "listForm";
const parent = "div.row";

/*
const event1 = "send-doc";
const event2 = "delete-doc";
const event3 = "list-docs-ready";
const event4 = "modal-doc";
const event5 = "modal-doc-user";
 */




import {fields} from "../../listCollections/tests/fields_list";
import grid from "../../listCollections/listGrid.svelte";
import schema from "../../formBuilder/tests/testing_form_schema";
import {form} from "../../formBuilder/tests/testing_text";


const confList = {
  coll:       "starter",          // collection name to list
  showHdr:    true,               // show card header and title if true

  hasRows:    true,               // show row length selection box
  hasSearch:  true,               // show search box
  hasFilters: true,               // show search filters for specific fields
  hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
  hasOverlay: false,              // support for form overlaying the list during edit operation

  display:    "list",             // show results as a "list" (default) or as a "grid" of cards
  displayGrid: grid,              // grid card display component

  target:     "/home",            // launch page for a click table item
};

const confForm = {
  coll:       "starter",          // target collection to send submit to
  formType:   "is-form-tabbed",   // modifier for formHolder to add features
  hasGroups:  true,               // allows fields to be grouped onto the same row
  hasTabs:    true,               // has tabbed fields in form
  tabLen:     4,
};



/* step 2: construct test data */
const props = {
  confList: confList,
  confForm: confForm,
  schema: schema,
  listArray: fields,
  formText: form,
  listText: {
    labels: {
      hdr: "Document List",
      addNew: "Add New"
    }
  }
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import { Meteor } from 'meteor/meteor';
import sinon from "sinon";
import CUT from '../listForm.svelte';

let instance;
let component;
let stub;



/* step 4: perform tests */
const fieldSingle = [10, 2, 3, 1];
const fieldGroups = [3, 0, 0, 0];
const fieldHR = [1, 0, 0, 0];

import assert from "assert";

describe(`component ${compName}.svelte`, function () {

  before(function(){
    stub = sinon.stub(Meteor, "callAsync").returns([]);

    /** render component with appropriate props **/
    instance = new CUT({
      target: document.getElementById(testId),
      props: props
    });

    /** get rendered component **/
    component = document.querySelector(`#${testId} > ${parent}`);
  });

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);
  });

  it(`${compName} structure listCollections`, function () {
    const header = component.querySelector(`header`);
    assert.ok(header && header.innerHTML.length > 2 , `CUT is missing "header" element.`);

    const form = component.querySelector(`form`);
    assert.ok(form, `CUT is missing "form" element.`);

    const rows = component.querySelector(`form .has-field-addons span.icon-bg-list`);
    assert.ok(rows, `CUT is missing "rows" component.`);

    const counts = component.querySelector(`form span.icon-bg-file`);
    assert.ok(counts, `CUT is missing "counts" component.`);

    const search = component.querySelector(`form span.icon-bg-search`);
    assert.ok(search, `CUT is missing "search" component.`);

    const filter = component.querySelector(`form span.icon-bg-filter`);
    assert.ok(filter, `CUT is missing "search" filter.`);

    const pagination = component.querySelector(`nav.pagination`);
    assert.ok(pagination, `CUT is missing "pagination" component.`);

    const table = component.querySelector(`table.table`);
    assert.ok(table, `CUT is missing "list table" component.`);
  });

  it(`${compName} structure formHolder`, function () {
    const tabs = component.querySelectorAll(`ul > li > label`);
    const labels = form.formTabs;

    assert.strictEqual(tabs.length, confForm.tabLen , `Result was "${tabs.length}", but should be "${confForm.tabLen}"`);

    tabs.forEach( (item, idx) => {
      assert.strictEqual(item.innerHTML, labels[idx], `Result was "${item.innerHTML}", but should be "${labels[idx]}"`);
    });

    const container = component.querySelectorAll(`.form-group-container > .form-group`);
    assert.strictEqual(container.length, confForm.tabLen, `Expected ${confForm.tabLen} groups, found ${container.length} groups.`)

    container.forEach( (item, idx) => {
      const helpTexted = item.querySelectorAll(".has-help-text");
      assert.strictEqual(helpTexted.length, fieldSingle[idx], `Group ${idx}: Expected ${fieldSingle[idx]} help-fields, found ${helpTexted.length} help-fields.`);

      const grouped = item.querySelectorAll(".field-group");
      assert.strictEqual(grouped.length, fieldGroups[idx], `Group ${idx}: Expected ${fieldGroups[idx]} groups, found ${grouped.length} groups.`);

      const hr = item.querySelectorAll(".field--hr");
      assert.strictEqual(hr.length, fieldHR[idx], `Group ${idx}: Expected ${fieldHR[idx]} "hr", found ${hr.length} "hr".`);
    });

  });
});