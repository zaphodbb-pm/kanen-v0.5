/* step 1: define component key parts */
const compName = "listFilters";
const parent = "div";
const parentClass = "field-group";
const eventName = "filterUpdate";


/* step 2: construct test data */
const props = {
  filters: [
    {
      field: "dateTest",
      filter: "dateTest",
      type: "date",
      filterText: {placeholder: "Date Range"},
    },

    {
      field: "staticSelectTest",
      filter: "staticSelectTest.name",
      type: "select",
      filterText: [
        {_id: "all", name: "All", colour: "#000000"},
        {_id: "sun", name: "Sunday", colour: "#000000"},
        {_id: "mon", name: "Monday", colour: "#6666ff"},
        {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
        {_id: "wed", name: "Wednesday", colour: "#33aa33"},
        {_id: "thu", name: "Thursday", colour: "#ff8822"},
        {_id: "fri", name: "Friday", colour: "#aaaaaa"},
        {_id: "sat", name: "Saturday", colour: "#ff0000"},
      ]
    }
  ],

  listText: {
    dateTest: {label: "Day"},
    staticSelectTest: {label: "Day",}
  }
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../listFilters.svelte';


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
  <div class="field-group has-nowrap">
    <div class="filter-items">

      <div style="flex-wrap: nowrap; width: 75%;">
        <div class="has-field-addons">
          <label>
            <span>Day</span>
            <input type="date" id="fp1_dateTest" placeholder="Date Range" style="width: 9rem;">
          </label>
        <label>
          <input type="date" id="fp2_dateTest" placeholder="Date Range" style="width: 9rem;">
          </label>
        </div>
      </div>

    </div>
  </div>
   */



  it(`${compName} structure`, function () {
    const filterWrapper = component.querySelector(`.filter-items`);
    assert.ok( filterWrapper, `CUT is missing ".filter-items" element.`);

    const filters = component.querySelectorAll(`.filter-items > *`);
    const msg = `Found ${filters.length} filters, expected ${props.filters.length} filters.`
    assert.ok( filters && filters.length === props.filters.length, msg);
  });



  it(`${compName} input fires "${eventName}"`, async function () {


    const li = component.querySelectorAll(`ul > li > a`);
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** pick a page and check event **/
    let page = 3;
    li[page].click();
    let msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);

    /** go to a previous page **/
    page = 2;
    li[0].click();
    msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);

    /** go to a next page **/
    page = 3;
    li[listLength - 1].click();
    msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);
  });

});