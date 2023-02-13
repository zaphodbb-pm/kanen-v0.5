/* step 1: define component key parts */
const compName = "gauge";
const parent = "figure";
const parentClasses = ["gauge-ring", "gauge-secondary", "gauge-warning", "test-class"];
const firstChildName = "data";
const secondChildName = "figcaption";


/* step 2: construct test data */
const props = {
  text: {
    title: "CUT",
    suffix: "suffix",
  },

  config: {
    gauge: "ring",
    type: "secondary",
    isRelative: true,
    lowThreshold: 10,
    highThreshold: 80
  },

  payload: {value: 42, max: 100},

  class: "test-class"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../gauge.svelte';

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

    assert.ok( component.classList.contains(props.class), `parent classes should include "${props.class}"`);
  });

  it(`${compName} firstChild / payload`, function () {
    const payload = component.querySelector(firstChildName);
    assert.ok(payload, `payload should be "${firstChildName}" tag`);

    /** firstChild is the data area for a gauge **/
    const attr = payload.getAttribute("value");
    assert.ok( attr === props.payload.value.toString(), `firstChild value attribute should be "${props.payload.value}"`);

    const styles = payload.getAttribute("style");
    const styleValue = `--gauge-value:${props.payload.value}; --gauge-max:${props.payload.max};`;
    assert.ok( styles === styleValue, `firstChild style should be "${styleValue}`);

    const number = payload.querySelector("span");
    const label = number.innerText.includes(payload.value);
    const suffix = number.innerText.includes(props.text.suffix);
    assert.ok(label && suffix, `label should include "${props.payload.value}${props.text.suffix}"`);
  });

  it(`${compName} secondChild / caption`, function () {
    const caption = component.querySelector(secondChildName);
    assert.ok(caption, `caption should be "${secondChildName}" tag`);
    assert.ok(caption.innerText === props.text.title, `secondChild should wrap text "${props.text.title}"`)
  });

});