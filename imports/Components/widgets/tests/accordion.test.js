/* step 1: define component key parts */
const compName = "accordion";
const parent = "div";
const parentClasses = "accordions";

const firstChildName = "details";
const firstChildClasses = "accordion";

const ChildName0 = "summary";
const ChildName1 = "div";


/* step 2: construct test data */
const props = {

  content: [
    {icon: "label_icon1", label: "Item One", text: "text for tab one.", style: "is-expander-primary"},
    {icon: "label_icon2", label: "Item Two", text: "text for tab two.", style: "is-expander-secondary"},
    {icon: "label_icon3", label: "Item Three", text: "text for tab three.", style: "is-expander-tertiary"},
  ],

  class: "test-class"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../accordion.svelte';

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

    const hasCompClass = component.classList.contains(parentClasses);
    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasCompClass && hasModifier, `parent classes should be "${parentClasses} ${props.class}"`);
  });

  it(`${compName} children of ${firstChildName}`, function () {
    const body = component.querySelectorAll(firstChildName);
    assert.ok( body.length === props.content.length, `Should have ${props.content.length} "${firstChildName}" children`);

    for( let i = 0; i < body.length; i++){
      const child = body[i];
      assert.ok(child.classList.contains(firstChildClasses), `firstChild classes should include "${firstChildClasses}"`);
      assert.ok(child.classList.contains(props.content[i].style), `firstChild classes should include "${props.content[i].style}"`);

      const summary = child.querySelector(ChildName0);
      assert.ok(summary, `summary should be "${ChildName0}" tag`);

      const spans = summary.querySelectorAll(":scope > span");
      assert.ok(spans[0].classList.contains(props.content[i].icon), `label icon should be "${props.content[i].icon}"`);
      assert.ok(spans[1].innerHTML === props.content[i].label, `label text should be "${props.content[i].label}"`);

      const div = child.querySelector(ChildName1);
      assert.ok(div, `text should be "${ChildName1}" tag`);
      assert.ok(div.innerHTML === props.content[i].text, `text should be "${props.content[i].text}"`);
    }
  });

});