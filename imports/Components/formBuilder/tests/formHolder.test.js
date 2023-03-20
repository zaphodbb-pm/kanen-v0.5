/* step 1: define component key parts */
const compName = "formHolder";
const parent = "form";
const eventName = "current-editted-doc";

const config = {
  coll:       "starter",          // target collection to send submit to
  formType:   "is-form-tabbed",   // modifier for formHolder to add features
  hasGroups:  true,               // allows fields to be grouped onto the same row
  hasTabs:    true,               // has tabbed fields in form
  tabLen:     4,
};

const fieldSingle = [10, 2, 3, 1];
const fieldGroups = [3, 0, 0, 0];
const fieldHR = [1, 0, 0, 0];

import schema from "./testing_form_schema";
import {form} from "./testing_text";

let defaults = {};

schema.forEach(function (f) {
  defaults[f.field] = f.defaultValue;
});


/* step 2: construct test data */
const props = {
  config: config,
  formText: form,
  schema: schema,
  role: "all",
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../formHolder.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});



/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > component ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasFormClass = component.classList.contains("form");
    const hasModifier = component.classList.contains(config.formType);
    assert.ok( hasFormClass && hasModifier, `parent class should be "form" and include ${config.formType}`);
  });

  it(`${compName} structure`, function () {
    const tabs = component.querySelectorAll(`ul > li > label`);
    const labels = form.formTabs;

    assert.strictEqual(tabs.length, config.tabLen , `Result was "${tabs.length}", but should be "${config.tabLen}"`);

    tabs.forEach( (item, idx) => {
      assert.strictEqual(item.innerHTML, labels[idx], `Result was "${item.innerHTML}", but should be "${labels[idx]}"`);
    });

    const container = component.querySelectorAll(`.form-group-container > .form-group`);
    assert.strictEqual(container.length, config.tabLen, `Expected ${config.tabLen} groups, found ${container.length} groups.`)

    container.forEach( (item, idx) => {
      const helpTexted = item.querySelectorAll(".has-help-text");
      assert.strictEqual(helpTexted.length, fieldSingle[idx], `Group ${idx}: Expected ${fieldSingle[idx]} help-fields, found ${helpTexted.length} help-fields.`);

      const grouped = item.querySelectorAll(".field-group");
      assert.strictEqual(grouped.length, fieldGroups[idx], `Group ${idx}: Expected ${fieldGroups[idx]} groups, found ${grouped.length} groups.`);

      const hr = item.querySelectorAll(".field--hr");
      assert.strictEqual(hr.length, fieldHR[idx], `Group ${idx}: Expected ${fieldHR[idx]} "hr", found ${hr.length} "hr".`);
    });

  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const button = component.querySelector(`.submit-buttons button`);

    let testResult;
    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    button.click();

    schema.forEach( item => {
      const keys = Object.keys(testResult);
      assert.ok(keys.includes(item.field), `Missing field "${item.field}"`);
    })
  });

});