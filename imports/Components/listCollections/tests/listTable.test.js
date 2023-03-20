/* step 1: define component key parts */
const compName = "listTable";
const parent = "div";
const parentClass = "table-container";


const event1 = "item-edit";
const event2 = "item-delete";

//item-modal-user
//item-modal



/* step 2: construct test data */
const props = {
  config: {},
  labels: [],
  documents: [],
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