/* step 1: define component key parts */
import assert from "assert";

const compName = "reportbox";
const parent = "figure";
const parentClasses = ["reportbox", "report-warning", "test-class"];

const firstChildName = "figcaption";
const firstChildClasses = "sr-only";

const secondChildName = "div";

const lastChildName = "label";


/* step 2: construct test data */
const props = {
  text: {
    title: "CUT",
    srCaption: "CUT",
    progLabel: "Progress Label",
    valPrefix: "prefix",
    valSuffix: "suffix",
  },

  config: {
    isProgress: true,
    icon: "icon-bg-key",
    image: "",
    alt: "alt",
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
import CUT from '../reportbox.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* step 4: perform tests */
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

  it(`${compName} firstChild / ${firstChildName}`, function () {
    const caption = component.querySelector(firstChildName);
    assert.ok(caption, `caption should be "${firstChildName}" tag`);
    assert.ok( caption.classList.contains(firstChildClasses), `caption classes should include "${firstChildClasses}"`);
    assert.ok( caption.innerText === props.text.srCaption, `caption text should be "${props.text.srCaption}"`);
  });

  it(`${compName} secondChild / ${secondChildName}`, function () {
    const div = component.querySelector(secondChildName);
    assert.ok(div, `text area should be "${secondChildName}" tag`);

    const icon = div.querySelector(`${secondChildName} > span`).classList;
    assert.ok(icon.contains(props.config.icon), `component icon should be "${props.config.icon}"`)
  });

  it(`${compName} lastChild / ${lastChildName}`, function () {
    const lastChild = component.querySelector(lastChildName);
    assert.ok( lastChild, `lastChild should be "${lastChildName}" tag`);

    const title = lastChild.children[0].innerText === props.text.title;
    assert.ok(title, `lastChild title should be "${props.text.title}"`);

    const label = `${props.text.valPrefix}${props.payload.value}${props.text.valSuffix}`;
    const child1 = lastChild.children[1].innerText;
    assert.ok( child1 === label, `lastChild label should be "${label}"`);

    const child2 = lastChild.children[2];
    const value = props.payload.value;
    const max = props.payload.max;
    assert.ok(child2.tagName === "PROGRESS", `third child should be "progress" tag`);
    assert.ok(child2.innerHTML === `${value}%`, `lastChild progress text should be "${value}%"`);
    assert.ok(child2.getAttribute("value") === value.toString(), `third child value should be "${value}"`);
    assert.ok(child2.getAttribute("max") === max.toString(), `third child max should be "${max}"`);

    const progLabel = `${props.payload.value}% ${props.text.progLabel}`;
    const child3 = lastChild.children[3].innerText;
    assert.ok( child3 === progLabel, `lastChild label should be "${progLabel}"`);
  });

});