import assert from "assert";
import HTMLParser from 'html-to-json-parser'; // see https://github.com/yousufkalim/html-to-json for documentation


/* component key parts and test data */
const compName = "reportbox";
const parent = "figure";
const parentClasses = "reportbox report-warning test-class";

const firstChildName = "figcaption";
const firstChildClasses = "sr-only";

const lastChildName = "label";

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


/* boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/reportbox.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* finally, perform tests */
describe(`component ${compName}.svelte`, async function () {
  let component, body, result;

  /* get rendered component and parse to JSON object */
  before(async function () {
    component = document.getElementById(testId);
    result = await HTMLParser(component.innerHTML, false);
  });

  it(`${compName} exists`, function () {
    const isParent = (result.type === parent);
    assert.ok( isParent, `parent should be "${parent}" tag`);

    const hasClasses = result.attributes?.class.trim().includes(parentClasses);
    assert.ok( hasClasses, `parent classes should be "${parentClasses}"`);

    const content = result.content;
    assert.ok(Array.isArray(content), `parent should have an array of children`);

    body = content.filter( item => typeof item === "object");
  });

  it(`${compName} firstChild`, function () {
    const firstChild = body[0];

    const isFirstChild = (firstChild.type === firstChildName);
    assert.ok( isFirstChild, `firstChild should be "${firstChildName}" tag`);

    const hasClasses = firstChild.attributes?.class.trim().includes(firstChildClasses);
    assert.ok( hasClasses, `firstChild classes should be "${firstChildClasses}"`);

    const content = firstChild.content;
    assert.ok(Array.isArray(content) && content[0] === props.text.srCaption, `firstChild should have props value "${props.text.srCaption}"`);
  });

  it(`${compName} secondChild`, function () {
    const secondChild = body[1].content[0];

    const hasClasses = secondChild.attributes?.class.trim().includes(props.config.icon);
    assert.ok( hasClasses, `secondChild classes should be "${props.config.icon}"`);
  });


  it(`${compName} lastChild / payload`, function () {
    const lastChild = body.pop();
    const content = lastChild.content.filter( item => typeof item === "object");

    const isLastChild = (lastChild.type === lastChildName);
    assert.ok( isLastChild, `lastChild should be "${lastChildName}" tag`);

    const title = content[0].content[0] === props.text.title;
    assert.ok( title, `lastChild title should be "${props.text.title}"`);

    const label = content[1].content[0] === `${props.text.valPrefix}${props.payload.value}${props.text.valSuffix}`;
    assert.ok( label, `lastChild label should be "${props.text.valPrefix}${props.payload.value}${props.text.valSuffix}"`);

    const attributeValue = content[2].attributes.value === props.payload.value.toString();
    const attributeMax = content[2].attributes.max === props.payload.max.toString();
    const attributes = attributeValue && attributeMax;
    assert.ok( attributes, `lastChild attributes should be '{"value":"${props.payload.value}","max":"${props.payload.max}}"'`);

    const progressLabel = content[3].content[0] === `${props.payload.value}% ${props.text.progLabel}`;
    assert.ok( progressLabel, `lastChild progress label should be "${props.payload.value}% ${props.text.progLabel}"`);
  });

});