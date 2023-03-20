/* step 1: define component key parts */
const compName = "relative_dateFilter";
const parent = "label";
const eventName = "filter-changed";


/* step 2: construct test data */
const props = {
  field:             {
    field:  "dayRelativeTest",
    key:    "dayRelativeTest.name",
    type:   "select",
    label:  "tbd",
    sort:   1,
    search: true,
    filter: {_id: "none", name: "None"},

    filterText: {
      relativeDates: [
        {_id: "none", name: "All Times"},
        {_id: "days_p_1", name: "Today"},
        {_id: "days_p_7", name: "Past Week"},
        {_id: "days_p_30", name: "Past Month"},
        {_id: "days_p_90", name: "Past Quarter"},
        {_id: "days_f_1", name: "Tomorrow"},
        {_id: "days_f_7", name: "This Week"},
        {_id: "days_f_30", name: "This Month"},
        {_id: "days_f_90", name: "This Quarter"}
      ]
    }
  },

  listText: {
    label: "Relative Day",
  }
}


/* expected written select element */
const checkHTML = [
  {_id: "none", name: "All Times"},
  {_id: "days_p_1", name: "Today"},
  {_id: "days_p_7", name: "Past Week"},
  {_id: "days_p_30", name: "Past Month"},
  {_id: "days_p_90", name: "Past Quarter"},
  {_id: "days_f_1", name: "Tomorrow"},
  {_id: "days_f_7", name: "This Week"},
  {_id: "days_f_30", name: "This Month"},
  {_id: "days_f_90", name: "This Quarter"}
];

const selectOption = 1;
const checkQuery = [0, 1, 7, 30, 90, 1, 7, 30, 90];


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../dateFilter.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";
describe(`component ListCollections > filterPlugins - ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);
  });

  it(`${compName} structure`, function () {
    const label = component.querySelector(`${parent} > span`);
    assert.ok( label && label.innerHTML.length > 2, `CUT is missing "span" label`);

    const select = component.querySelector(`${parent} > select`);
    assert.ok( select, `CUT is missing "select" element`);

    /** extract option value and text and compare to test **/
    let options = select.querySelectorAll(`option`);
    let optionsValues = [];

    options.forEach( item => {
      optionsValues.push({_id: item.getAttribute("value"), name: item.innerHTML.trim()});
    });

    assert.deepStrictEqual( optionsValues, checkHTML, `CUT select options mis-structured, found ${JSON.stringify(optionsValues)}`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const select = component.querySelector("select");
    const day = 1000 * 3600 * 24;
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
      testResult = testResult[props.field.field];
    });

    /** simulate keyboard event and wait for debounce propagation **/
    select.selectedIndex = selectOption;
    select.dispatchEvent(new Event('change'));

    const hasGTE = testResult["$gte"] && typeof testResult["$gte"] === "string" && testResult["$gte"].length === 10;
    const hasLTE = testResult["$lte"] && typeof testResult["$lte"] === "string" && testResult["$lte"].length === 10;

    const start = hasGTE ? (new Date(testResult["$gte"]) ).getTime() : 0;
    const end = hasLTE ? (new Date(testResult["$lte"]) ).getTime() : 0;
    const range = (end - start) / day;

    assert.ok(hasGTE && hasLTE && range === checkQuery[selectOption], `Result at index ${selectOption} was ${JSON.stringify(testResult)}.`);
  });

});