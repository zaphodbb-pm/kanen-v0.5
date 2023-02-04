import assert from "assert";
import HTMLParser from 'html-to-json-parser'; // see https://github.com/yousufkalim/html-to-json for documentation


/* component key parts and test data */
const compName = "infobox";
const parent = "figure";
const parentClasses = "infobox infobox-primary";

const firstChildName = "figcaption";
const firstChildClasses = "sr-only";

const lastChildName = "a";

const props = {
  text: {title: "CUT", srCaption: "CUT", footer: "Footer", url: "https://google.com"},
  config: {icon: "icon-bg-alert-success", image: "", alt: "alt", type: "primary"},
  payload: {value: 42}
}


/* boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/infobox.svelte';

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

  it(`${compName} payload`, function () {
    const inner = component.innerHTML;

    const hasTitle = inner.includes(props.text.title);
    assert.ok( hasTitle, `component title should be "${props.text.title}"`);

    const hasValue = inner.includes(props.payload.value);
    assert.ok( hasValue, `payload value should be "${props.payload.value}"`);

    const hasClass = inner.includes(props.config.icon);
    assert.ok( hasClass, `component icon should be "${props.config.icon}"`);
  });

  it(`${compName} lastChild`, function () {
    const lastChild = body.pop();

    const isLastChild = (lastChild.type === lastChildName);
    assert.ok( isLastChild, `lastChild should be "${lastChildName}" tag`);

    const content = lastChild.content[0].content[0] === props.text.footer;
    assert.ok( content, `lastChild text should be "${props.text.footer}"`);

    const url = lastChild.attributes?.href === props.text.url
    assert.ok( url, `lastChild url should be "${props.text.url}"`);
  });

});