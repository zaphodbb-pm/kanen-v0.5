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
          <th class=" svelte-13nu1au">Check</th>
          <th class=" svelte-13nu1au">ID</th>
          <th class=" svelte-13nu1au">Link</th>
          <th class=" svelte-13nu1au">Modal</th>
          <th class=" svelte-13nu1au">Modal User</th>
          <th class=" svelte-13nu1au">Phone</th>
          <th class=" svelte-13nu1au">Status</th>
          <th class=" svelte-13nu1au">New page</th>
          <th class=" svelte-13nu1au">Boolean</th>
          <th class="has-text-centered svelte-13nu1au">Del</th>
        </tr>
      </thead>



      <tbody>
        <tr class="" style="position: relative;">
          <td class="add-cursor is-text-semibold svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all; color: var(--link);">abcdef</td>
          <td class="pict pictSmall svelte-13nu1au"><div><img src="data:image/png;base64,iVBORw0KGgoAAAAg" class="list-thumbnail svelte-13nu1au" alt="thumbnail"></div></td>
          <td class="text_cell svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">Monday</td>
          <td class=" svelte-13nu1au">Jan 26, 2023</td>
          <td class=" svelte-13nu1au"><a href="'mailTo:' + abc@example.com">abc@example.com</a></td>
          <td class="svelte-13nu1au"><span class="buffer-small"><span class="tag is-medium is-danger svelte-13nu1au"><b>system</b></span></span></td>
          <td class="svelte-13nu1au">{"one":"One", "two":2}</td>
          <td class="text_cell svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">53 years ago</td>
          <td class="svelte-13nu1au"><input type="checkbox" class="checkbox" title="cell.value"></td>
          <td data-id="testId" class="svelte-13nu1au"></td>
          <td class="add-cursor svelte-13nu1au">
            <a href="https://testlink.org" target="_blank"><span><span class="icon-bg-eye is-medium"></span></span></a>
          </td>

          <td class="add-cursor has-text-link is-text-semibold svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">[object Object]</td>

          <td class="add-cursor has-text-link has-text-weight-semibold text-left svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">[object Object]</td>

          <td class=" svelte-13nu1au"><a href="'tel:' + 15142340987">+1 (514) 234-0987</a></td>
          <td class="has-text-left list-status svelte-13nu1au"><span style=""><span class="icon-bg-cog is-medium"></span></span> Success</td>
          <td class="add-cursor has-text-info has-text-weight-semibold text-left svelte-13nu1au" style="overflow-wrap: break-word; word-break: break-all;">null</td>
          <td class="has-text-success text-center text-1dot4rem svelte-13nu1au" style="padding-bottom: 0px; padding-top: 0px;"><span>●</span></td>
          <td class="table-delete-td svelte-13nu1au"><span class="icon-bg-trash has-text-danger table-delete-icon svelte-13nu1au"></span></td>
        </tr>
      </tbody>


    </table>
  </div>
   */


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