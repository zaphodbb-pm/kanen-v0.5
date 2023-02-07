import assert from "assert";
import HTMLParser from 'html-to-json-parser'; // see https://github.com/yousufkalim/html-to-json for documentation


/* component key parts */
const compName = "gauge";
const parent = "figure";
const parentClasses = "gauge-ring gauge-secondary gauge-warning test-class";
const firstChildName = "data";
const secondChildName = "figcaption";


/* test data */
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


/* boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/gauge.svelte';

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

  it(`${compName} firstChild / payload`, function () {
    const firstChild = body[0];
    const content = firstChild.content.filter( item => typeof item === "object");

    /* firstChild is the data area for a gauge */
    const isFirstChild = (firstChild.type === firstChildName);
    assert.ok( isFirstChild, `firstChild should be "${firstChildName}" tag`);

    const styleValue = `--gauge-value:${props.payload.value}; --gauge-max:${props.payload.max};`;
    const attributeStyle = firstChild.attributes.style === styleValue;
    const attributeValue = firstChild.attributes.value === props.payload.value.toString();
    const attributes = attributeValue && attributeStyle;
    assert.ok( attributes, `firstChild attributes should be {"value":"${props.payload.value}","style":${styleValue}}`);

    /* check label area */
    const value = content[0].content[0];
    assert.ok(value === props.payload.value.toString(), `label value should be "${props.payload.value}"`);

    /* check label formation */
    const suffix = content[0].content[1].content[0];
    assert.ok(suffix === props.text.suffix, `label suffix should be "${props.text.suffix}"`);
  });


  it(`${compName} secondChild`, function () {
    const secondChild = body.pop();

    const isSecondChild = (secondChild.type === secondChildName);
    assert.ok( isSecondChild, `secondChild should be "${secondChildName}" tag`);

    const content = secondChild.content;
    assert.ok(Array.isArray(content) && content[0] === props.text.title,
        `secondChild should have props value "${props.text.title}"`);
  });

});