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
    value: [{id: 1, text: '...'}],
  },

  error: "",

  class: "test-form-field"
}


/* expected event object */
const checkClick = {value: props.field.value, error: !!props.error};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import {waitFor} from "../../../tests/waitFor";
import CUT from '../itemList.svelte';



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

  /*
  <fieldset class="field--item-list  test-form-field  svelte-1nwhqo1">
    <legend>Undefined Field Label</legend>
    <button type="button" class="add-rows is-rounded is-primary svelte-1nwhqo1" title="add row">
      <span class="icon-bg-circle-plus is-medium svelte-1nwhqo1"></span>
    </button>

    <ul class="svelte-1gqits8">
      <li data-index="0" data-id="1" draggable="true" class="svelte-1gqits8">
        <div class="level svelte-1nwhqo1">
          <div class="row-id svelte-1nwhqo1">1</div>
          <label>
            <input type="checkbox" class="is-checkradio is-info has-background-color" title="simple check box" id="checkbox_0.16644304701204327_1">
          </label>

          <textarea class="textarea svelte-1nwhqo1" rows="2"></textarea>

          <div class="has-text-centered">
            <span class="icon-bg-circle-minus is-medium has-text-danger"></span>
          </div>
        </div>
      </li>
    </ul>
  </fieldset>
   */

  it(`${compName} input fires "${eventName}"`, async function () {
    const input = component.querySelector("input");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    const evt = new KeyboardEvent('keyup', { key: "a" });
    input.dispatchEvent(evt);
    await waitFor(800);

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkClick)}`;
    assert.deepStrictEqual(testResult, checkClick, msg);
  });



});