/* step 1: define component key parts */
const compName = "geoAddress";
const parent = "div";
//const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "geoAddressTest",
    fieldType: "input",
    optional: true,

    attributes: {type: "text", maxlength: 128},
    params: {},
    defaultValue: "",
    value: ""
  },

  fieldText: {
    label: `${compName}`,
  },

  error: "",

  class: "test-form-field"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../geoAddress.svelte';



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
    const label = component.querySelector(`label > span`);
    assert.ok( label && label.innerHTML.length > 3, `CUT is missing "span" label`);

    const input = component.querySelector(`label > input`);
    assert.ok( input, `CUT is missing "input" element`);

    const className = input.classList.contains("input");
    assert.ok( className, `CUT is missing "class=input".`);

    const type = input.getAttribute("type");
    assert.ok( type && type === "text", `CUT is missing "type=text".`);
  });

  it(`${compName} menu`, function () {
    const menu = component.querySelector(`.vbta-menu`);
    assert.ok( menu, `CUT is missing "menu" section`);

    const ul = menu.querySelector(`ul`);
    assert.ok( ul, `CUT is missing "ul" element`);
  });

});