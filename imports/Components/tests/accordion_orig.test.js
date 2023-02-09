import assert from "assert";
import HTMLParser from 'html-to-json-parser'; // see https://github.com/yousufkalim/html-to-json for documentation


/* component key parts */
const compName = "accordion";
const parent = "div";
const parentClasses = "accordions";

const firstChildName = "details";
const firstChildClasses = "accordion";

const ChildName0 = "summary";
const ChildName1 = "div";

/* test data */
const props = {

  content: [
    {icon: "label icon", label: "Item One", text: "text for tab one.", style: "is-expander-primary"},
    {icon: "label icon", label: "Item Two", text: "text for tab two.", style: "is-expander-secondary"},
    {icon: "label icon", label: "Item Three", text: "text for tab three.", style: "is-expander-tertiary"},
  ],

  class: "test-class"
}


/* boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/accordion.svelte';

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

    const hasClasses = result.attributes?.class.trim().includes(`${parentClasses} ${props.class}`);
    assert.ok( hasClasses, `parent classes should be "${parentClasses}  ${props.class}"`);

    const content = result.content;
    assert.ok(Array.isArray(content), `parent should have an array of children`);

    body = content.filter( item => typeof item === "object");
  });


  it(`${compName} children as ${firstChildName}`, function () {
    assert.ok( body.length === props.content.length, `Should have "${props.content.length}" children`);

    for( let i = 0; i < body.length; i++){
      const firstChild = body[i];

      console.log("firstChild",  firstChild);

      /** test summary tag info **/
      const isFirstChild = (firstChild.type === firstChildName);
      assert.ok( isFirstChild, `firstChild should be "${firstChildName}" tag`);


      const addedClass = props.content[i].style;
      const hasClasses = firstChild.attributes?.class.trim().includes(`${firstChildClasses} ${addedClass}`);
      assert.ok( hasClasses, `firstChild classes should be "${firstChildClasses} ${addedClass}"`);

      const summary = firstChild.content[0];
      assert.ok(summary.type === ChildName0, `summary should be "${ChildName0}" tag`);

      const summaryBody = summary.content.filter( item => typeof item === "object");
      const checkClass = summaryBody[0].attributes.class === props.content[i].icon;
      assert.ok(checkClass, `firstChild icon class should be "${props.content[i].icon}"`);

      const checkLabel = summaryBody[1].content[0] === props.content[i].label;
      assert.ok(checkLabel, `firstChild label should be "${props.content[i].label}"`);



      /** test summary text body **/
      const textBody = firstChild.content[1];

      console.log("textBody before", firstChild.content.length, firstChild.content);

      console.log("textBody", textBody);

      assert.ok(textBody.type === ChildName1, `Text body should be "${ChildName1}" tag`);

    }




    /*
    const firstChild = body[0];

    const isFirstChild = (firstChild.type === firstChildName);
    assert.ok( isFirstChild, `firstChild should be "${firstChildName}" tag`);

    const hasClasses = firstChild.attributes?.class.trim().includes(firstChildClasses);
    assert.ok( hasClasses, `firstChild classes should be "${firstChildClasses}"`);

    const content = firstChild.content;
    assert.ok(Array.isArray(content) && content[0] === props.text.srCaption, `firstChild should have props value "${props.text.srCaption}"`);

     */
  });

  /*

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

   */

});