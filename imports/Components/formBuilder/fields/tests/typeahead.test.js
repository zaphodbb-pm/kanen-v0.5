/* step 1: define component key parts */
import {waitFor} from "../../../tests/waitFor";

const compName = "typeahead";
const parent = "div";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "typeaheadTest",
    fieldType: "typeahead",
    optional: true,

    attributes: {},
    params: {type: "staticSelect", rows: 3},
    defaultValue: {_id: "", name: ""},
    value: {_id: "sun", name: "Sunday"},
  },

  fieldText: {
    label: `${compName}`,
    helpText: "Uses a static list to search through for characters typed into input box.",
    selects: [
      {_id: "sun", name: "Sunday"},
      {_id: "mon", name: "Monday"},
      {_id: "tue", name: "Tuesday"},
      {_id: "wed", name: "Wednesday"},
      {_id: "thu", name: "Thursday"},
      {_id: "fri", name: "Friday"},
      {_id: "sat", name: "Saturday"},
    ]
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkClick = {value: props.fieldText.selects[0], error: !!props.error};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../typeahead.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const label = component.querySelector(`${parent} > label`);
    assert.ok( label, `CUT is missing "label" element.`);

    const readonly = label.querySelector(".vbta-hint");
    const input = label.querySelector(".vbta-input");
    assert.ok( readonly && input, `CUT is missing "inout" elements.`);

    const ul = component.querySelector(`${parent} > div ul`);
    assert.ok( ul, `CUT is missing "ul" element.`);
  });

  it(`${compName} selecting source row fires "${eventName}"`, async function () {
    const search = component.querySelector(`${parent} > label .vbta-input`);

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    const evt = new KeyboardEvent('keyup', { key: "n" });
    search.dispatchEvent(evt);
    await waitFor(100);

    const li = component.querySelector(`${parent} > div ul > li`);

    li.click();

    const msg = `instance event is ${JSON.stringify(testResult.value[1])} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);
  });

});