/* step 1: define component key parts */
const compName = "formSubmit";
const parent = "div";
const eventName = "submit-btn";
const eventName2 = "back-btn";

import {form} from "./testing_text";


/* step 2: construct test data */
let submit = {
  btnEdit: form.labels.editBtn,
  btnCreate: form.labels.createBtn,
  btnBack: form.labels.backBtn,
  btnInvText: form.labels.invalidInput,

  btnBackShow: true,
  btnState: false,
  btnInvalid: true,
  btnCount: 0,
  invalidFields: []
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../formSubmit.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: submit
});


/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains("submit-buttons");
    assert.ok( hasModifier, `parent class should be "submit-buttons"`);
  });

  it(`${compName} structure`, function () {
    const div = component.querySelector(`.level`);
    assert.ok( div, `CUT is missing button wrapper "div" element with class "level".`);

    const button = div.querySelectorAll(`button`);
    assert.strictEqual(button.length, 2, `Expected 2 buttons, found ${button.length} buttons.`);

    assert.ok( button[0] && button[0].innerHTML === submit.btnCreate, `CUT is missing "create button" label.`);
    assert.ok( button[1] && button[1].innerHTML === submit.btnBack, `CUT is missing "back button" label.`);

    const type0 = button[0].getAttribute("type");
    assert.ok( type0 && type0 === "button", `CUT button0 is missing "type=button".`);

    const type1 = button[1].getAttribute("type");
    assert.ok( type1 && type1 === "button", `CUT button1 is missing "type=button".`);

    const para = component.querySelector(`p`);
    assert.ok(para && para.innerText.length > 3, `Expected paragraph with text.`);

    const list = para.querySelector(`span`);
    assert.ok(list, `Expected span for error text.`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const button = component.querySelectorAll("button");

    let testResult;

    instance.$on(eventName, function (ev) {
      testResult= ev.detail;
    });

    button[0].click();

    assert.ok( testResult, `instance field found ${testResult}`);
  });

  it(`${compName} input fires "${eventName2}"`, async function () {
    const button = component.querySelectorAll("button");

    let testResult;

    instance.$on(eventName2, function (ev) {
      testResult = ev.detail;
    });

    button[1].click();

    assert.ok( testResult, `instance field found ${testResult}`);
  });

});