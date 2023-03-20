/* step 1: define component key parts */
const compName = "selectFilter";
const parent = "label";
const eventName = "filter-changed";


/* step 2: construct test data */
const props = {
  field:             {
    field:  "staticSelectTest",
    key:    "staticSelectTest.name",
    type:   "select",
    label:  "tbd",
    sort:   1,
    search: true,
    filter: {_id: "none", name: "None"},

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
  },

  listText: {
    label: "Day",
  }
}


/* expected written select element */
const checkHTML = [
  {_id: "all", name: "All"},
  {_id: "sun", name: "Sunday"},
  {_id: "mon", name: "Monday"},
  {_id: "tue", name: "Tuesday"},
  {_id: "wed", name: "Wednesday"},
  {_id: "thu", name: "Thursday"},
  {_id: "fri", name: "Friday"},
  {_id: "sat", name: "Saturday"},
];

const selectOption = 1;
const checkSelect = {"staticSelectTest._id":"sun"};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../selectFilter.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";
//component ListCollections > filterPlugins - function calcGeoRadius
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
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    select.selectedIndex = selectOption;
    select.dispatchEvent(new Event('change'));

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkSelect)}`;
    assert.deepStrictEqual(testResult, checkSelect, msg);
  });

});