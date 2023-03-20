/* step 1: define component key parts */
const compName = "editor";
const parent = "label";
const addon = "div";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "editorTest",
    fieldType: "editor",
    attributes: {maxlength: 50000},
    params: {},

    optional: true,
    defaultValue: "",
    value: "editor start"
  },

  fieldText: {
    label: `${compName}`,
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
import CUT from '../editor/editor.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > fields component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);
  const editor = document.querySelector(`#${testId} > ${addon}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);

    assert.ok(editor, `editor should be "${addon}" tag`);
  });

  it(`${compName} structure`, async function () {
    const label = component.querySelector(`label > span`);
    assert.ok(label && label.innerHTML.length > 3, `CUT is missing "span" label`);

    await waitFor(200);
    const editorAfter = document.querySelector(`.trumbowyg-box`);
    assert.ok(editorAfter, `CUT is missing "class=trumbowyg-box".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const textarea = document.querySelector(".trumbowyg-editor")

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    const evt = new Event('tbwchange');
    textarea.dispatchEvent(evt);

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);  });
});