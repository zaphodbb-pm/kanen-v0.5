/* step 1: define component key parts */
const compName = "searchbox";
const parent = "div";
const eventName = "search-changed";


/* step 2: construct test data */
const props = {
  fields: [
    {
      field:  "name",
      key:    "name",
      type:   "edit",
      label:  "tbd",
      sort:   1,
      search: true,
    },

    {
      field:  "staticSelect",
      key:    "staticSelect.name",
      type:   "select",
      label:  "tbd",
      sort:   1,
      search: true,
    }
  ]
}


const checkText = "Check_Text";
const checkSearch = {
  search: checkText,
  query:{
    $or:[
        {name:{$regex:`.*${checkText}.*`,$options:"i"}},
        {"staticSelect.name":{$regex:`.*${checkText}.*`,$options:"i"}}
    ]
  }
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../searchbox.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`ListCollections > component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent} .has-field-addons`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent} .has-field-addons" tag`);
  });

  it(`${compName} structure`, function () {
    const buttons = component.querySelectorAll(`button`);

    assert.ok( buttons[0], `CUT is missing "search" button element`);
    assert.ok( buttons[0].innerHTML.includes("icon-bg"), `CUT search button is missing "icon" class.`);
    assert.ok( buttons[0].getAttribute("type") === "button", `CUT is missing "type=button".`);

    assert.ok( buttons[1], `CUT is missing "help" button element`);
    assert.ok( buttons[1].innerHTML.includes("icon-bg"), `CUT help button is missing "icon" class.`);
    assert.ok( buttons[1].getAttribute("type") === "button", `CUT is missing "type=button".`);

    const label = component.querySelector(`label`);
    assert.ok( label, `CUT is missing "label" element.`);

    const text = label.querySelector("span");
    assert.ok( text && text.innerHTML.length > 2, `CUT input is missing "icon" class`);

    const input = label.querySelector(`input`);
    assert.ok( input, `CUT is missing "input" element`);

    const type = input.getAttribute("type");
    assert.ok( type && type === "text", `CUT is missing "type=text".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const input = component.querySelector("input");
    let testResult;

    input.value = checkText;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    input.dispatchEvent(new Event("input"));

    const msg = `instance event is ${JSON.stringify(testResult)}.`;
    assert.deepStrictEqual(testResult, checkSearch, msg);
  });

  after(function(){
    document.getElementById(testId).remove();
  });

});