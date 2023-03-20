/* step 1: define component key parts */
const compName = "geoFilter";
const parent = "label";
const eventName = "filter-changed";


/* step 2: construct test data */
const props = {
  field: {
    field:  "geoLocation",
    key:    "geoLocation",
    type:   "address",
    label:  "tbd",
    sort:   false,
    search: true,
    filter: {_id: "none", name: "World Wide"},

    filterText: [
      {_id: "none", name: "World Wide"},
      {_id: "nearby", name: "Nearby"},
      {_id: "citywide", name: "City Wide"},
      {_id: "inregion", name: "In Region"}
    ]
  },

  listText: {
    label: "Location",
  }
}


/* expected written select element */
const checkHTML = [
  {_id: "none", name: "World Wide"},
  {_id: "nearby", name: "Nearby"},
  {_id: "citywide", name: "City Wide"},
  {_id: "inregion", name: "In Region"}
];

const selectOption = 1;
const checkSelect = {geoLocation:{$nearSphere:{$geometry:{type:"Point",coordinates:[-75,45]},$maxDistance:1000000}}};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../geoFilter.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";
//component ListCollections > filterPlugins - function calcGeoRadius
describe(`ListCollections > filterPlugins - ${compName}.svelte`, function () {
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