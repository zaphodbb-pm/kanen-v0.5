/* step 1: define component key parts */
const compName = "tabbedContent";
const parent = "div";
const parentClasses = "tabs";


/* step 2: construct test data */
const props = {

  content: [
    {icon: "label_icon1", label: "Item One", lead: "Lead text", text: "text for tab one."},
    {icon: "label_icon2", label: "Item Two", lead: "Lead text", text: "text for tab two."},
    {icon: "label_icon3", label: "Item Three", lead: "Lead text", text: "text for tab three."},
  ],

  class: "test-class"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../tabbedContent.svelte';

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


  it(`${compName} has input tags`, function () {
    const inputs = component.querySelectorAll("input");

    inputs.forEach( (item, idx) => {
      assert.ok(item.getAttribute("type") === "radio", `Input should have type "radio"`);
      assert.ok(item.getAttribute("name") === "tab_unit_1", `Input should have name "tab_unit_1"`);
      assert.ok(item.getAttribute("hidden") !== null, `Input should be "hidden"`);

      const id = props.content[idx].label;
      assert.ok(item.getAttribute("id") === id, `Input should have id "${id}"`);
    });
  });

  it(`${compName} has ul child`, function () {
    const ul = component.querySelector("ul");

    assert.ok(ul, `Missing ul element`);
    assert.ok(ul.getAttribute("hidden") !== null, `Element ul should be "hidden"`);

    const li = ul.querySelectorAll("li");
    const liLength = props.content.length;
    assert.ok(li.length === liLength, `Should have ${liLength} "li"s.`);

    li.forEach( (item, idx) => {
      const label = item.querySelector("label");

      const testLabel = props.content[idx].label.trim();
      assert.ok(label.htmlFor === testLabel, `Element li > label should have htmlFor attribute "${testLabel}"`);
      assert.ok(label.innerText.trim() === testLabel, `Element li > label should have text "${testLabel}"`);

      const icon = label.querySelector("span");
      const testIcon = props.content[idx].icon;
      assert.ok(icon.classList.contains(testIcon), `label should have span with icon ${testIcon}`);
    });
  });

  it(`${compName} has "div.tab-content" children`, function () {
    const div = component.querySelector("div.tab-content");
    assert.ok(div, `Missing "div" content element`);

    const sections = div.querySelectorAll("section");
    const sectionLength = props.content.length;
    assert.ok(sections.length === sectionLength, `Should have ${sectionLength} "section"s.`);

    sections.forEach( (item, idx) => {
      const heading = item.firstElementChild;
      const label = props.content[idx].label;
      assert.ok(heading.tagName.includes("H"), `Section heading requires "h" tag`);
      assert.ok(heading.classList.contains("sr-only"), `Section heading should only be visible to screen readers.`);
      assert.ok(heading.innerHTML === label, `Section heading label should be "${label}"`);

      const lead = item.lastElementChild;
      const leadText = props.content[idx].lead;
      assert.ok(lead.tagName === "P", `Section lead should be a paragraph with "p" tag`);
      assert.ok(lead.classList.contains("lead"), `Section lead paragraph should have CSS "lead" tag.`);
      assert.ok(lead.innerHTML === leadText, `Section heading label should be "${leadText}"`);

      const body = lead.nextSibling.wholeText.trim();
      const bodyText = props.content[idx].text;
      assert.ok( body === bodyText, `Section body text should be "${bodyText}"` )
    });
  });

});