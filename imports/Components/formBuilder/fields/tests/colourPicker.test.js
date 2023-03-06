/* step 1: define component key parts */
const compName = "colourPicker";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "startColours",
    fieldType: "colours",
    optional: true,

    tab: 2,
    attributes: {},
    params: {},
    defaultValue: "#000000",
    value: "#000000"
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkValue = "#ffffff";


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../colourPicker.svelte';


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

    const type = input.getAttribute("type");
    assert.ok( type && type === "color", `CUT is missing "type=color".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const input = component.querySelector("input");
    let testResult;

    input.value = checkValue;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail?.value ?? "n/a";
    });

    input.dispatchEvent(new Event('input'));

    const msg = `instance event is ${testResult} but should be ${checkValue}`;
    assert.strictEqual(testResult, checkValue, msg);
  });

});