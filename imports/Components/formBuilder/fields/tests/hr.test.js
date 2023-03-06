/* step 1: define component key parts */
const compName = "hr";
const parent = "div";



/* step 2: construct test data */
const props = {
  field:     {
    field: "hrTest",
    fieldType: "hr",
    tag: "some text",
  },

  error: "",

  class: "test-form-field"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../hr.svelte';


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
    const label = component.querySelector(`${parent} > div`);
    assert.ok( label, `CUT is missing "div" element`);

    const tag = label.getAttribute("data-content");
    assert.ok( tag && tag === props.field.tag, `CUT is missing "data-content" tag.`);

    const className = label.classList.contains("divider");
    assert.ok( className, `CUT is missing "class=divider".`);
  });

});