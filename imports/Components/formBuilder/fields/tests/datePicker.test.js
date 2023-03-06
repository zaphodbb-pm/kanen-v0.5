/* step 1: define component key parts */
const compName = "datePicker";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "datePickerTest",
    fieldType: "datePicker",
    optional: true,


    attributes: {maxlength: 10},
    params: {dateFormat: 'Y-m-d', mode: 'single'},
    defaultValue: "",
    value: "2022-05-12",
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkValue = "2023-06-20";


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../datePicker.svelte';


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
    assert.ok( type && type === "date", `CUT is missing "type=color".`);
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