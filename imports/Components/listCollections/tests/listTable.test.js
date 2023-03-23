/* step 1: define component key parts */
const compName = "listTable";
const parent = "div";
const parentClass = "table-container";


const event1 = "item-edit";
const event2 = "item-delete";

//item-modal-user
//item-modal


/*
field: "name"
key: "name"
label: "Name"
type: "edit"
 */


/* step 2: construct test data */
const props = {
  config: {target: "/home"},
  labels: [
    {label: "Name"},
    {label: "Image"},
    {label: "Day"},
    {label: "Date"},
    {label: "Del"},

  ],
  documents: [
    { name: "abcdef",
      startDateTime: "2023-01-26",
      startImage: {name: '6512608.jpg', src: 'data:image/png;base64,iVBORw0KGgoAAAAg'},
      startStaticSelect: {_id: 'mon', name: 'Monday', colour: '#6666ff'},
      _id: "i8iLxTLRK6Ch2d74T"}
  ],
  collection: "test",
  submitted: false
};

/*
0
:
{field: 'name', key: 'name', type: 'edit', label: 'Name', sort: 1, …}
1
:
{field: 'startImage', key: 'startImage', type: 'cardImage', label: '', sort: 1, …}
2
:
{field: 'startStaticSelect', key: 'startStaticSelect.name', type: 'select', label: 'Day', sort: 1, …}
3
:
{field: 'startDateTime', key: 'startDateTime', type: 'date', label: 'Date', sort: 1, …}
4
:
{field: '_id', key: '_id', type: 'del', label: 'Del', sort: false, …}
length
:
5
 */



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
          <th class=" svelte-13nu1au">Image</th>
          <th class=" svelte-13nu1au">Day</th>
          <th class=" svelte-13nu1au">Date</th>
          <th class=" svelte-13nu1au">Del</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
   */




  it(`${compName} structure`, function () {
    const filterWrapper = component.querySelector(`.filter-items`);
    assert.ok( filterWrapper, `CUT is missing ".filter-items" element.`);

    const filters = component.querySelectorAll(`.filter-items > *`);
    const msg = `Found ${filters.length} filters, expected ${props.filters.length} filters.`
    assert.ok( filters && filters.length === props.filters.length, msg);
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