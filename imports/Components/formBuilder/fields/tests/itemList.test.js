/* step 1: define component key parts */
const compName = "itemList";
const parent = "fieldset";
const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "itemListTest",
    fieldType: "itemList",
    attributes: {maxlength: 5000, rows: 2},
    params: {
      key: "id",
      showCheck: true
    },

    optional: true,
    defaultValue: [{id: 1, text: '...'}],
    value: [{id: 1, check: "", text: "initial"}],
  },

  fieldText: {
    label: `${compName}`,
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkClick = {id: 2, check: "", text: ""};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../itemList.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > fields component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const legend = component.querySelector(`${parent} > legend`);
    assert.ok( legend && legend.innerHTML.length > 3, `CUT is missing "legend" element`);

    const button = component.querySelector(`${parent} > button`);
    assert.ok( button, `CUT is missing "button" element`);

    const className = button.classList.contains("add-rows");
    assert.ok( className, `CUT is missing "class=add-rows".`);
    assert.ok( button && button.innerHTML.includes("icon-bg"), `CUT is missing icon class.`);

    const type = button.getAttribute("type");
    assert.ok( type && type === "button", `CUT button is missing "type=button".`);
  });

  it(`${compName} list`, function () {
    const ul = component.querySelector(`${parent} > ul`);
    assert.ok( ul, `CUT is missing "ul" element.`);

    const li = ul.querySelector(`li`);
    assert.ok( li, `CUT is missing default "li" element.`);

    const id = li.querySelector("div.row-id");
    assert.ok( id && id.innerHTML === "1", `Missing "li" element row id.`);

    const input = li.querySelector("label input");
    assert.ok( input && input.getAttribute("type") === "checkbox", `Missing "input" element checkbox.`);

    const del = li.querySelector("div:not(.row-id)");
    assert.ok( del && del.innerHTML.includes("icon-bg"), `Missing "delete" icon.`);
  });

  it(`${compName} "add row" button fires "${eventName}"`, async function () {
    const button = component.querySelector(`${parent} > button`);

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    button.click();

    const msg = `instance event is ${JSON.stringify(testResult.value[1])} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult.value[1], checkClick, msg);
  });

});