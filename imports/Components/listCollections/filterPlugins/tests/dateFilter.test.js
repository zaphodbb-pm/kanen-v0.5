/* step 1: define component key parts */
const compName = "dateFilter";
const parent = "div";
const eventName = "filter-changed";


/* step 2: construct test data */
const props = {
  field:             {
    field:  "dateTest",
    key:    "dateTest",
    type:   "date",
    label:  "tbd",
    sort:   1,
    search: true,

    filterText: {placeholder: "Placeholder Text"}
  },

  listText: {
    label: "Day",
  }
}


/* expected written select element */
const checkReturn = ["$gte", "$lte"];


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../dateFilter.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";
describe(`component ListCollections > filterPlugins - ${compName}.svelte`, function () {
  const component = document.querySelector(`#${testId} > ${parent}`);

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);
  });

  it(`${compName} structure`, function () {
    const name = component.querySelector(`${parent} .has-field-addons span`);
    assert.ok( name && name.innerHTML.length > 2, `CUT is missing "span" name.`);

    const labels = component.querySelectorAll(`${parent} label`);
    assert.ok( labels && labels.length === 2, `CUT is missing two "label" elements.`);

    labels.forEach( (item, idx) => {
      const day = item.querySelector("input");
      assert.ok( day, `CUT is missing "day${idx}" input element.`);
      assert.ok( day.getAttribute("type") === "date", `CUT "day${idx}" input does not have "type=date".`);
      assert.ok( day.getAttribute("id"), `CUT "day${idx}" input does not have "id".`);
    });
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const day = component.querySelectorAll(`${parent} label input`);
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
      testResult = Object.keys(testResult[props.field.field]);
    });

    day[0].dispatchEvent(new Event('input'));

    const msg = `instance event is ${JSON.stringify(testResult)} but should be ${JSON.stringify(checkReturn)}`
    assert.deepStrictEqual(testResult, checkReturn, msg);
  });

});