/* step 1: define component key parts */
const compName = "inputs";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "startCheckbox",
    fieldType: "checkboxes",
    optional: true,

    tab: 0,
    attributes: {},
    params: {cols: 2, buttons: true},
    css: "is-vertical",
    defaultValue: [],
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkClick = {value: props.field.value, error: !!props.error};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import {waitFor} from "../../../tests/waitFor";
import CUT from '../inputs.svelte';



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
    const label = component.querySelector(`${parent} > span`);
    assert.ok( label && label.innerHTML.length > 3, `CUT is missing "span" label`);

    const input = component.querySelector(`${parent} > input`);
    assert.ok( input, `CUT is missing "input" element`);

    const className = input.classList.contains("input");
    assert.ok( className, `CUT is missing "class=input".`);

    const type = input.getAttribute("type");
    assert.ok( type && type === "text", `CUT is missing "type=text".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const input = component.querySelector("input");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    const evt = new KeyboardEvent('keyup', { key: "a" });
    input.dispatchEvent(evt);
    await waitFor(800);

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);
  });

});