/* step 1: define component key parts */
const compName = "listHolder";
const parent = "div.table-boxed";

/*
const event1 = "send-doc";
const event2 = "delete-doc";
const event3 = "list-docs-ready";
const event4 = "modal-doc";
const event5 = "modal-doc-user";
 */

import {fields} from "./fields_list";
import grid from "../listGrid.svelte";

const config = {
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

/* step 2: construct test data */
const props = {
  config: config,
  listText: {
      labels: {
        hdr: "Document List",
        addNew: "Add New"
      }
    },
  fields: fields,
  sort: {},
   submitted: false
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import { Meteor } from 'meteor/meteor';
import sinon from "sinon";
import CUT from '../listHolder.svelte';

let instance;
let component;
let stub;



/* step 4: perform tests */
import assert from "assert";

describe(`ListCollection > component ${compName}.svelte`, function () {

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

  it(`${compName} structure`, function () {
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
});