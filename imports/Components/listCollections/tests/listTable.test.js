/* step 1: define component key parts */
const compName = "listTable";
const parent = "div";
const parentClass = "table-container";


const event1 = "item-edit";
const event2 = "item-delete";

//item-modal-user
//item-modal

import {fields} from "./fields_list";


/* step 2: construct test data */
const props = {
  config: {target: "/home"},
  labels: fields,
  documents: [
    { name: "abcdef",
      testImage: {name: '6512608.jpg', src: 'data:image/png;base64,iVBORw0KGgoAAAAg'},
      testSelect: {_id: 'mon', name: 'Monday', colour: '#6666ff'},
      testDate: "2023-01-26",
      testEmails: "abc@example.com",
      testTags: "System",
      testObject: {one: "One", two: 2},
      updatedAt: "1234567890",
      _id: "i8iLxTLRK6Ch2d74T"}
  ],
  collection: "test",
  submitted: false
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

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(parentClass);
    assert.ok( hasModifier, `parent classes should be "${parentClass}"`);
  });


  /*
  <div class="table-container">
    <table class="table is-fullwidth">

      <thead>
        <tr>
          <th class=" svelte-13nu1au">Name</th>
          <th class=" svelte-13nu1au">Card Image</th>
          <th class=" svelte-13nu1au">Select Box</th>
          <th class=" svelte-13nu1au">Date</th>
          <th class=" svelte-13nu1au">Email</th>
          <th class=" svelte-13nu1au">Item tag</th>
          <th class=" svelte-13nu1au">Object</th>
          <th class=" svelte-13nu1au">Updated At</th>
          <th class="has-text-centered svelte-13nu1au">Del</th>
        </tr>
      </thead>

      <tbody>
        <tr class="" style="position: relative;">
          <td class="add-cursor is-text-semibold svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all; color: var(--link);">abcdef</td>
          <td class="text_cell svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">Monday</td>
          <td class=" svelte-13nu1au">Jan 26, 2023</td>
          <td class=" svelte-13nu1au"><a href="'mailTo:' + abc@example.com">abc@example.com</a></td>
          <td class="svelte-13nu1au"><span class="buffer-small"><span class="tag is-medium undefined svelte-13nu1au"><b>System</b></span></span></td>
          <td class="svelte-13nu1au">{"one":"One", "two":2}</td>
          <td class="table-delete-td svelte-13nu1au"><span class="icon-bg-trash has-text-danger table-delete-icon svelte-13nu1au"></span></td>
        </tr>
      </tbody>

    </table>
  </div>
   */




  it(`${compName} structure`, function () {
    const fieldsLength = fields.length;

    const table = component.querySelector(`table`);
    assert.ok( table, `CUT is missing "table" element.`);

    const thead = table.querySelector(`thead`);
    assert.ok( thead, `CUT is missing "thead" element.`);

    const th = thead.querySelectorAll(`th`);
    assert.ok( th.length === fieldsLength, `Found ${th.length} "th" elements, should have ${fieldsLength} "th" elements.`);

    const tbody = table.querySelector(`tbody`);
    assert.ok( tbody, `CUT is missing "tbody" element.`);

    const td = tbody.querySelectorAll(`td`);
    assert.ok( td.length === fieldsLength, `Found ${td.length} "td" elements, should have ${fieldsLength} "td" elements.`);
  });

  it(`${compName} input fires "${event1}"`, async function () {

    /*
    const target = component.querySelector(`#${eventTarget}`);
    target.value = initDate;

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
      testResult = testResult[props.filters[0].field];
    });

    target.dispatchEvent(new Event('input'));

    assert.deepStrictEqual(testResult?.$gte, initDate, `Initial date not returned, found ${testResult?.$gte}.`)
    assert.deepStrictEqual(testResult?.$lte, secondDate, `Second date not returned, found ${testResult?.$lte}.`)

     */
  });

});