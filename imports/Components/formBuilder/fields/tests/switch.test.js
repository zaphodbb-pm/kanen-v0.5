/* step 1: define component key parts */
const compName = "switch";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "switchTest",
    fieldType: "switch",
    optional: true,

    attributes: {},
    params: {},
    defaultValue: false,
    value: false,
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkClick = {value: true, error: !!props.error};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../switch.svelte';


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

    const input = component.querySelector(`${parent} input`);
    assert.ok( input, `CUT is missing "input" element.`);

    const span = component.querySelector(`${parent} .switch`);
    assert.ok( span, `CUT is missing "class=switch".`);

    const type = input.getAttribute("type");
    assert.ok( type && type === "checkbox", `CUT is missing "type=checkbox".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const input = component.querySelector("input");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    input.click();

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);
  });

});