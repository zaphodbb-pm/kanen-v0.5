/* step 1: define component key parts */
const compName = "messages";
const parent = "aside";
const parentClass = "system-messages";


/* step 2: construct test data */
const props = {
  closable: true,
  duration: 0,
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../messages/messages.svelte';



/* step 4: perform tests */
import assert from "assert";
let instance;
let component;

describe(`component ${compName}.svelte`, function () {

  before(async function () {
    /** render component with appropriate props **/
    instance = new CUT({
      target: document.getElementById(testId),
      props: props
    });

    /** get rendered component **/
    component = document.querySelector(`#${testId} > ${parent}`);
  });


  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(parentClass);
    assert.ok( hasModifier, `parent classes should be "${parentClass}"`);
  });
});