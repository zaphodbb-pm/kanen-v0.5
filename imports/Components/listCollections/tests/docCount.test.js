/* step 1: define component key parts */
const compName = "docCount";
const parent = "div";


/* step 2: construct test data */
const props = {
  docCountLabel: "count of documents"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../docCount.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`ListCollections > component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}.level`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}.level" tag`);
  });

  it(`${compName} structure`, function () {
    const icons = component.querySelectorAll(`span`);

    assert.ok( component.innerHTML.includes("icon-bg"), `CUT is missing "icon" class.`);
    assert.ok( icons && icons[1] && icons[1].innerHTML.includes(props.docCountLabel), `CUT is missing document label.`);
  });

});