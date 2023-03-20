/* step 1: define component key parts */
const compName = "textarea";
const parent = "label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "textAreaTest",
    fieldType: "textarea",
    optional: true,
    tab: 0,
    attributes: {maxlength: 5000, rows: 3},
    params: {},
    defaultValue: "",

    value: "some text",
  },

  fieldText: {
    label: `${compName}`,
  },

  error: "",

  class: "test-form-field"
};


/* expected event object */
const checkText = "Check Text";
const checkClick = {value: checkText, error: !!props.error};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../textarea.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > fields component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const label = component.querySelector(`${parent} > span`);
    assert.ok( label && label.innerHTML.length > 3, `CUT is missing "span" label`);

    const textarea = component.querySelector(`${parent} > textarea`);
    assert.ok( textarea, `CUT is missing "textarea" element.`);

    const className = textarea.classList.contains("textarea");
    assert.ok( className, `CUT is missing "class=textarea".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const textarea = component.querySelector("textarea");
    textarea.value = checkText;

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    const evt = new KeyboardEvent('input');
    textarea.dispatchEvent(evt);

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);
  });

});