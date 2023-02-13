/* step 1: define component key parts */
const compName = "infobox";
const parent = "figure";
const parentClasses = ["infobox", "infobox-primary"];

const firstChildName = "figcaption";
const firstChildClasses = "sr-only";

const secondChildName = "div";

const lastChildName = "a";


/* step 2: construct test data */
const props = {
  text: {title: "CUT", srCaption: "CUT", footer: "Footer", url: "https://google.com"},
  config: {icon: "icon-bg-alert-success", image: "", alt: "alt", type: "primary"},
  payload: {value: 42}
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../infobox.svelte';

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

  it(`${compName} firstChild / ${firstChildName}`, function () {
    const caption = component.querySelector(firstChildName);
    assert.ok(caption, `caption should be "${firstChildName}" tag`);
    assert.ok( caption.classList.contains(firstChildClasses), `caption classes should include "${firstChildClasses}"`);
    assert.ok( caption.innerText === props.text.srCaption, `caption text should be "${props.text.srCaption}"`);
  });

  it(`${compName} secondChild / ${secondChildName}`, function () {
    const div = component.querySelector(secondChildName);
    assert.ok(div, `text area should be "${secondChildName}" tag`);

    const label = div.querySelector("p").innerText;
    const testData = `${props.payload.value} ${props.text.title}`
    assert.ok(label === testData, `label text should be "${testData}"`);

    const icon = div.querySelector("div > span").classList;
    assert.ok(icon.contains(props.config.icon), `component icon should be "${props.config.icon}"`)
  });

  it(`${compName} lastChild / ${lastChildName}`, function () {
    const lastChild = component.querySelector(lastChildName);
    assert.ok( lastChild, `lastChild should be "${lastChildName}" tag`);

    const url = lastChild.getAttribute("href");
    assert.ok( url === props.text.url, `lastChild url should be "${props.text.url}"`);

    const content = lastChild.innerText;
    assert.ok( content === props.text.footer, `lastChild text should be "${props.text.footer}"`);
  });

});