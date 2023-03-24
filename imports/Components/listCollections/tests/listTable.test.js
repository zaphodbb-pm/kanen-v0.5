/* step 1: define component key parts */
const compName = "listTable";
const parent = "div";
const parentClass = "table-container";

/** events and their trigger target **/
const event1 = "item-edit";
const event2 = "item-delete";
const event3 = "item-modal";
const event4 = "item-modal-user";

const eventTarget1 = '[data-fieldname="name"]';
const eventTarget2 = '[data-fieldname="_id"]';
const eventTarget3 = '[data-fieldname="testModal"]';
const eventTarget4 = '[data-fieldname="testModalUser"]';


/* step 2: construct test data */
import {fields} from "./fields_list";

const props = {
  config: {target: "/home"},
  labels: fields,
  documents: [
    { name: "abcdef",
      testImage: {name: '6512608.jpg', src: 'data:image/png;base64,iVBORw0KGgoAAAAg'},
      testSelect: {_id: 'mon', name: 'Monday', colour: '#6666ff'},
      testDate: "2023-01-26",
      testEmails: "abc@example.com",
      testTags: "system",
      testObject: {one: "One", two: 2},
      testCheck: "Checkbox Test",
      testTag: "System",
      testId: "testId",
      testLink: "https://testlink.org",
      testModal: "testModal",
      testModalUser: "testModalUser",
      testPhone: "15142340987",
      testStatus: {name: "Success"},
      testNewPage: "https://newpage.org",
      testBoolean: true,
      updatedAt: 1234567890,
      _id: "i8iLxTLRK6Ch2d74T"
    }
  ],
  collection: "test",
  submitted: false
};

const checkResult =     {
  name: "abcdef",
  testImage: '<div><img src="data:image/png;base64,iVBORw0KGgoAAAAg" class="list-thumbnail svelte-13nu1au" alt="thumbnail"></div>',
  testSelect: 'Monday',
  testDate: "Jan 26, 2023",
  testEmails: '<a href="mailto:abc@example.com">abc@example.com</a>',
  testTags: '<span class="buffer-small"><span class="tag is-medium is-danger svelte-13nu1au"><b>system</b></span></span>',
  testObject: '{"one":"One", "two":2}',
  testCheck: '<input type="checkbox" class="checkbox" title="Checkbox Test">',
  testTag: "System",
  testId: "",
  testLink: '<a href="https://testlink.org" target="_blank"><span><span class="icon-bg-eye is-medium"></span></span></a>',
  testModal: "testModal",
  testModalUser: "testModalUser",
  testPhone: '<a href="tel:15142340987">+1 (514) 234-0987</a>',
  testStatus: '<span style=""><span class="icon-bg-cog is-medium"></span></span> Success',
  testNewPage: "https://newpage.org",
  testBoolean: '<span>●</span>',
  updatedAt: '53 years ago',
  _id: '<span class="icon-bg-trash has-text-danger table-delete-icon svelte-13nu1au"></span>'
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../listTable.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`ListCollections >  component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);
  const fieldsLength = fields.length;

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(parentClass);
    assert.ok( hasModifier, `parent classes should be "${parentClass}"`);
  });

  it(`${compName} structure main`, function () {
    const table = component.querySelector(`table`);
    assert.ok( table, `CUT is missing "table" element.`);

    const thead = table.querySelector(`thead`);
    assert.ok( thead, `CUT is missing "thead" element.`);

    const tbody = table.querySelector(`tbody`);
    assert.ok( tbody, `CUT is missing "tbody" element.`);
  });

  it(`${compName} structure "thead"`, function () {
    const thead = component.querySelector(`table > thead`);
    assert.ok( thead, `CUT is missing "thead" element.`);

    const th = thead.querySelectorAll(`th`);
    assert.ok( th.length === fieldsLength, `Found ${th.length} "th" elements, should have ${fieldsLength} "th" elements.`);

    fields.forEach( (item, idx) => {
      const label = th[idx].innerHTML.trim();
      assert.strictEqual( item.label, label, `Label for item ${idx} was ${item.label}, expected ${label}.`)
    })
  });

  it(`${compName} structure "tbody"`, function () {
    const tbody = component.querySelector(`table > tbody`);
    assert.ok( tbody, `CUT is missing "tbody" element.`);

    const td = tbody.querySelectorAll(`td`);
    assert.ok( td.length === fieldsLength, `Found ${td.length} "td" elements, should have ${fieldsLength} "td" elements.`);

    td.forEach( (item, idx) => {
      const fieldname = item.dataset.fieldname;
      const test = checkResult[fieldname];
      assert.strictEqual(item.innerHTML, test, `Found "td${idx}" ${fieldname}.innerHtml: ${item.innerHTML}, expected ${test}.`)
    });
  });

  it(`${compName} input fires "${event1}"`, async function () {
    const target = component.querySelector(eventTarget1);
    let testResult;

    instance.$on(event1, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult.id === props.documents[0]._id && testResult.edit, `Found result ${JSON.stringify(testResult)}`);
  });

  it(`${compName} input fires "${event2}"`, async function () {
    const target = component.querySelector(eventTarget2);
    let testResult;

    instance.$on(event2, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult.id === props.documents[0]._id, `Found result ${JSON.stringify(testResult)}`);
  });

  it(`${compName} input fires "${event3}"`, async function () {
    const target = component.querySelector(eventTarget3);
    let testResult;

    instance.$on(event3, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult._id === props.documents[0]._id, `Found result ${JSON.stringify(testResult._id)}`);
  });

  it(`${compName} input fires "${event4}"`, async function () {
    const target = component.querySelector(eventTarget4);
    let testResult;

    instance.$on(event4, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult._id === props.documents[0]._id, `Found result ${JSON.stringify(testResult._id)}`);
  });

});