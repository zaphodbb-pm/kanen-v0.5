/* step 1: define component key parts */
const compName = "checkboxes";
const parent = "fieldset";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "checkboxTest",
    fieldType: "checkboxes",
    optional: true,

    tab: 0,
    attributes: {},
    params: {cols: 2, buttons: true},
    css: "is-vertical",
    defaultValue: [],
    value: [],

    selects: [
      {_id: "light", name: "a little rusty"},
      {_id: "moderate", name: "a regular"},
      {_id: "active", name: "ready for anything"},
    ]
  },

  error: "",

  class: "test-form-field"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../checkboxes.svelte';



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
    const legend = component.querySelector(`${parent} > legend`);
    assert.ok( legend && legend.innerHTML.length > 3, `CUT is missing "legend" label`);

    const checkboxes = component.querySelectorAll(`${parent} > label`);
    const expectedChecks = props.field.selects;
    assert.ok( checkboxes && checkboxes.length === expectedChecks.length, `CUT should have ${expectedChecks.length} boxes, but found ${checkboxes.length} boxes`);

    checkboxes.forEach( item => {
      const input = item.querySelector("input");
      assert.ok( input, `CUT checkbox is missing "input" element`);

      const type = input.getAttribute("type");
      assert.ok( type && type === "checkbox", `CUT is missing "type=checkbox".`);

      const text = item.querySelector("span");
      assert.ok( text && text.innerHTML.length > 3, `CUT is missing "span" with text.`);
    });
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const boxIdx = 2;
    const input = component.querySelectorAll("input");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    input[boxIdx].click();

    const checkClick = [ props.field.selects[boxIdx] ];
    const msg = `instance event is ${JSON.stringify(testResult.value)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult.value, checkClick, msg);
  });

});