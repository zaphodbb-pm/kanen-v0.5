/* step 1: define component key parts */
const compName = "listFilters";
const parent = "div";
const parentClass = "field-group";
const eventName = "filters-changed";

const eventTarget = "fp1_dateTest";


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

/** check values **/
const initDate = "2023-01-01";
const secondDate = "2023-01-02";


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

  it(`${compName} structure`, function () {
    const filterWrapper = component.querySelector(`.filter-items`);
    assert.ok( filterWrapper, `CUT is missing ".filter-items" element.`);

    const filters = component.querySelectorAll(`.filter-items > *`);
    const msg = `Found ${filters.length} filters, expected ${props.filters.length} filters.`
    assert.ok( filters && filters.length === props.filters.length, msg);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
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
  });

});