/* step 1: define component key parts */
const compName = "radios";
const parent = "fieldset";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "radiosTest",
    fieldType: "radios",
    optional: true,

    tab: 0,
    attributes: {},
    params: {cols: 3},
    css: "is-vertical",
    defaultValue: {_id: "", name: ""},
    value: {_id: "", name: ""},

    selects: [
      {_id: "yes", name: "Yes"},
      {_id: "no", name: "No"},
      {_id: "maybe", name: "Maybe"}
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
import CUT from '../radios.svelte';



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

    const radios = component.querySelectorAll(`${parent} > label`);
    const expectedChecks = props.field.selects;
    assert.ok( radios && radios.length === expectedChecks.length, `CUT should have ${expectedChecks.length} boxes, but found ${radios.length} boxes`);

    radios.forEach( item => {
      const input = item.querySelector("input");
      assert.ok( input, `CUT checkbox is missing "input" element`);

      const type = input.getAttribute("type");
      assert.ok( type && type === "radio", `CUT is missing "type=radio".`);

      const text = item.querySelector("span");
      assert.ok( text && text.innerHTML.length > 1, `CUT is missing "span" with text.`);
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

    const checkClick = props.field.selects[boxIdx];
    const msg = `instance event is ${JSON.stringify(testResult.value)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult.value, checkClick, msg);
  });

});