/* step 1: define component key parts */
const compName = "fieldWrapper";
const parent = "div";
const eventName = "field-changed";


/* step 2: construct test data */
const props = {
  field:     {
    field: "inputTest",
    fieldType: "input",
    optional: true,

    attributes: {},
    params: {length: 24},
    defaultValue: "Some text",
    value: "Some text",
    tag: undefined,

    listen: {
      src: undefined
    },
    adjustLabel: false,

    formText: {
      label: "Input Field",
      helpText: "String input type",
    }
  },

  class: "test-form-field"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../fieldWrapper.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";


/*
<div class="has-help-text">
  <span>
    <span class="icon-bg-help"></span>
  </span>

  <label class="field--inputs test-form-field fieldname--inputTest ">
    <span>Input Field</span>
    <input class="input ">
  </label>
</div>

 */

describe(`component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains("has-help-text");
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const help = component.querySelector(`span`);
    assert.ok( help, `CUT is missing help "span" element`);
    assert.ok( help.innerHTML.includes("icon-bg"), `CUT is missing "icon" class`);

    const label = component.querySelector(`label > span`);
    assert.ok( label && label.innerHTML.length > 3, `CUT is missing "span" label`);

    const input = component.querySelector(`label > input`);
    assert.ok( input, `CUT is missing "input" element`);

    const className = input.classList.contains("input");
    assert.ok( className, `CUT is missing "class=input".`);

    const type = input.getAttribute("type");
    assert.ok( type && type === "text", `CUT is missing "type=text".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const button = component.querySelector("button");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    button.click();

    const checkId = testResult.value;
    const alphaNumeric = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/);
    assert.ok(checkId && checkId.length === props.field.params.length && alphaNumeric.test(checkId), `instance event is ${checkId}`);
  });

});