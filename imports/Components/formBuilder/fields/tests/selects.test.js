/* step 1: define component key parts */
const compName = "selects";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "staticSelectTest",
    fieldType: "select",
    optional: true,

    css: "is-fullwidth",
    attributes: {},
    params: {type: "staticSelect", colours: true},
    defaultValue: {_id: "all", name: "All Options"},
    value: {_id: "all", name: "All Options"},

    selectText: {
      label: "Static Select",
      helpText: "Select from a fixed list",
      tag: {_id: "all", name: "All Options", colour: "#000000"},
      selects: [
        {_id: "sun", name: "Sunday", colour: "#000000"},
        {_id: "mon", name: "Monday", colour: "#6666ff"},
        {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
        {_id: "wed", name: "Wednesday", colour: "#33aa33"},
        {_id: "thu", name: "Thursday", colour: "#ff8822"},
        {_id: "fri", name: "Friday", colour: "#aaaaaa"},
        {_id: "sat", name: "Saturday", colour: "#ff0000"},
      ]
    },
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
import CUT from '../selects.svelte';



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