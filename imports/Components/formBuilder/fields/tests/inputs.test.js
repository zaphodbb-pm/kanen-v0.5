/* step 1: define component key parts */
const compName = "inputs";
const parent = "label";
const fieldLabel = "Undefined Field Label";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    // control and decoration for fields in a form
    field: "testInput",
    fieldType: "input",
    value: "some text",

    attributes: {type: "text", maxlength: 64},
    params: {},
    defaultValue: "",
  },

  error: "",

  class: "test-form-field"
}


/*
const checkClick = [
  {item: props.id, key: 0, label: props.text.footer[0].text},
  {item: props.id, key: 1, label: props.text.footer[1].text},
]

 */


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../inputs.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const label = component.querySelector(`${parent} > span`);
    assert.ok( label && label.innerHTML.length > 3, `CUT is missing "span" label`);


    /*
    <label class="field--inputs test-form-field ">
      <span>Undefined Field Label</span>
      <input class="input " type="text" maxlength="64">
    </label>
     */

    /*
    const img = component.querySelector("figure > img");
    assert.ok( img, `CUT is missing "figure > img"`);

    const src = img.getAttribute("src");
    assert.ok( src === props.text.image, `CUT has malformed "img.src"`);

    const alt = img.getAttribute("alt");
    assert.ok( alt === props.text.altImage, `CUT has malformed "img.alt"`);

    const aspect = img.classList;
    assert.ok( aspect.contains(imgClass), `CUT is missing class`);

    const hdr = component.querySelector("header");
    assert.ok( hdr, `CUT is missing "header"`);

    const h3 = hdr.querySelector("h3");
    assert.ok( h3 && h3.innerHTML.length > 3, `CUT is missing "h3"`);

    const subTitle = hdr.querySelector("p");
    assert.ok( subTitle && subTitle.innerHTML.length > 3, `CUT is missing sub-title`);

     */
  });


  /*
  it(`${compName} footer button clicks on "${eventName}"`, async function () {
    const buttons = component.querySelectorAll("footer button");
    let testResult= [];

    instance.$on(eventName, function (ev) {
      testResult.push(ev.detail);
    });

    buttons[0].click();

    testResult.forEach( item => {
      const checkValue = checkClick[item.key];
      assert.deepStrictEqual(item, checkValue, `instance event is ${JSON.stringify(item)} but should be ${JSON.stringify(checkValue)}`);
    });
  });

   */

});