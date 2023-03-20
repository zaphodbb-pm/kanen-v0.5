/* step 1: define component key parts */
const compName = "rowSize";
const parent = "div";
const parentClass = "has-field-addons";
const eventName = "row-changed";


/* step 2: construct test data */
const props = {};


/* expected written select element */
const selectOption = 2;
const checkSelect = ["10", "15", "20", "30", "50", "100"];


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../rowSize.svelte';



/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`ListCollections >  component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(parentClass);
    assert.ok( hasModifier, `parent classes should be "${parentClass}"`);
  });

  it(`${compName} structure`, function () {
    const icon = component.querySelector(`${parent} > button`);
    assert.ok( icon && icon.innerHTML.includes("icon-bg"), `CUT is missing "span" icon.`);

    const label = component.querySelector(`${parent} > label`);
    assert.ok( label, `CUT is missing "label" element`);

    const select = label.querySelector(`select`);
    assert.ok( select, `CUT is missing "select" element`);

    /** extract option value and text and compare to test **/
    let options = select.querySelectorAll(`option`);

    options.forEach( (item, idx) => {
      const text = item.innerHTML.trim();
      const value = item.value;

      const msg = `Result was text and value of ${checkSelect[idx]}, found ${text} and ${value}.`;
      assert.ok(value === checkSelect[idx] && text === checkSelect[idx], msg);
    });
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const select = component.querySelector("select");
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** simulate keyboard event and wait for debounce propagation **/
    select.selectedIndex = selectOption;
    select.dispatchEvent(new Event('change'));

    const checkResult = {row: parseInt(checkSelect[selectOption])};
    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkResult)}`;
    assert.deepStrictEqual(testResult, checkResult, msg);
  });

});