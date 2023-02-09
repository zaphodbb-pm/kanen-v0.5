/* step 1: define component key parts */
const compName = "croppie";
const parent = "div";
const parentClasses = ["croppie-area"];

const buttonClass = "is-primary";
const icon = "icon-bg-cloud-save";


/* step 2: construct test data */
const props = {
  url: "/test-url",
  options: {}
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/croppie.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* step 4: perform tests */
import assert from "assert";

describe(`component ${compName}.svelte`, function () {
  let component;

  it(`${compName} exists`, function () {
    component = document.querySelector(`#${testId} > ${parent}`);
    assert.ok(component, `parent should be "${parent}" tag`);
  });

  it(`${compName} parent classes`, function () {
    parentClasses.forEach( item => {
      assert.ok( component.classList.contains(item), `parent classes should include "${item}"`);
    });
  });

  it(`${compName} firstChild "div"`, function () {
    const save = component.firstElementChild;

    assert.ok(save.tagName === "DIV", `Should have a save button wrapper.`);
    assert.ok(save.classList.contains("is-croppie-save"), `Save button wrapper is missing CSS.`)

    const button = save.querySelector("button");
    assert.ok(button, `Should have a "button" element`);
    assert.ok(button.classList.contains(buttonClass), `Button should have "${buttonClass}" class`);

    const span = button.querySelector("span");
    assert.ok(span.classList.contains(icon), `Button should have an associated icon "${icon}"`);
  });

  it(`${compName} container`, function () {
    const container = component.lastElementChild;

    assert.ok(container.tagName === "DIV", `Should have a container.`);
    assert.ok(container.classList.contains("croppie-container"), `Croppie container is missing CSS.`)

    const croppie = container.querySelector("canvas");
    assert.ok(croppie, `Should have a "canvas" element.`);

    const slider = container.lastElementChild;
    assert.ok(slider.classList.contains("cr-slider-wrap"), `Missing slider element`);
  });

});