/* step 1: define component key parts */
const compName = "listGrid";
const parent = "div";
const parentClass = "grid-list";

/** events and their trigger target **/
const event1 = "item-edit";
const event2 = "item-delete";


const eventTarget1 = '[data-fieldname="name"]';
const eventTarget2 = '[data-fieldname="_id"]';



/* step 2: construct test data */
import {fields} from "./fields_list";

const props = {
  config: {target: "/home"},
  labels: fields,
  documents: [
    { name: "abcdef",
      testImage: {name: '6512608.jpg', src: 'data:image/png;base64,iVBORw0KGgoAAAAg'},
      testSelect: {_id: 'mon', name: 'Monday', colour: '#6666ff'},
      testDate: "2023-01-26",
      testEmails: "abc@example.com",
      testTags: "system",
      testObject: {one: "One", two: 2},
      testCheck: "Checkbox Test",
      testTag: "System",
      testId: "testId",
      testLink: "https://testlink.org",
      testModal: "testModal",
      testModalUser: "testModalUser",
      testPhone: "15142340987",
      testStatus: {name: "Success"},
      testNewPage: "https://newpage.org",
      testBoolean: true,
      updatedAt: 1234567890,
      _id: "i8iLxTLRK6Ch2d74T"
    }
  ],
  collection: "test",
  submitted: false
};

const checkResult =     {
  name: "abcdef",
  testImage: '<div><img src="data:image/png;base64,iVBORw0KGgoAAAAg" class="list-thumbnail svelte-13nu1au" alt="thumbnail"></div>',
  testSelect: '<strong>testSelect:</strong> Monday',
  testDate: "n/a",
  testEmails: 'n/a',
  testTags: 'n/a',
  testObject: '{"one":"One", "two":2}',
  testCheck: 'n/a',
  testTag: "System",
  testId: "n/a",
  testLink: 'n/a',
  testModal: "n/a",
  testModalUser: "n/a",
  testPhone: 'n/a',
  testStatus: 'n/a',
  testNewPage: "https://newpage.org",
  testBoolean: '<span>&amp;#10004;</span>',
  updatedAt: '<strong>updatedAt:</strong> 53 years ago',
  _id: '<span><span class="icon-bg-trash is-medium has-text-danger"></span></span>'
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../listGrid.svelte';


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


  /*

  <div class="grid-list">
    <div class="row">
      <div class="column">
        <div class="card">
          <header>default grid</header>
          <div data-fieldname="name" class="add-cursor has-text-info has-text-weight-semibold text-left" style="overflow-wrap: break-word; word-break: break-all;">abcdef </div>
          <figure data-fieldname="testImage"><img class="has-aspect-2x1" src="[object Object]" alt="image"> </figure>
          <div data-fieldname="testSelect" class="has-text-left is-size-7"><strong>undefined:</strong> Monday </div>
          <div data-fieldname="testDate">n/a</div>
          <div data-fieldname="testEmails">n/a</div>
          <div data-fieldname="testTags">n/a</div>
          <div data-fieldname="testObject">{"one":"One", "two":2}</div>
          <div data-fieldname="updatedAt" class="has-text-left is-size-7"><strong>undefined:</strong> 53 years ago </div>
          <div data-fieldname="testCheck">n/a</div>
          <div data-fieldname="testId">n/a</div>
          <div data-fieldname="testLink">n/a</div>
          <div data-fieldname="testModal">n/a</div>
          <div data-fieldname="testModalUser">n/a</div>
          <div data-fieldname="testPhone">n/a</div>
          <div data-fieldname="testStatus">n/a</div>
          <div data-fieldname="testNewPage" class="add-cursor has-text-info has-text-weight-semibold text-left" style="overflow-wrap: break-word; word-break: break-all;">https://newpage.org </div>
          <div data-fieldname="testBoolean" class="text-green text-center"><span>&amp;#10004;</span> </div>
          <div data-fieldname="_id" class="add-cursor has-text-right" style="max-width: 100%;"><span><span class="icon-bg-trash is-medium has-text-danger"></span></span> </div>
        </div>
      </div>
    </div>
  </div>
   */





  it(`${compName} structure`, function () {
    const card = component.querySelector(`div > div > .card`);
    assert.ok( card, `CUT is missing ".card" element.`);

    const hdr = card.querySelector(`header`);
    assert.ok( hdr && hdr.innerHTML.length > 3, `CUT is missing "header" element.`);

    const figure = card.querySelector(`figure`);
    assert.ok( figure && figure.innerHTML.includes("has-aspect"), `CUT is missing "figure" element.`);

    const divs = card.querySelectorAll(`div`);
    const length = fields.length - 1;
    assert.ok( divs.length === length, `Found ${divs.length} "div" elements, expected ${length}.`);

    divs.forEach( (item, idx) => {
      const fieldname = item.dataset.fieldname;
      const test = checkResult[fieldname];
      assert.strictEqual(item.innerHTML.trim(), test, `Found "td${idx}" ${fieldname}.innerHtml: ${item.innerHTML}, expected ${test}.`)
    });
  });

  it(`${compName} input fires "${event1}"`, async function () {
    const target = component.querySelector(eventTarget1);
    let testResult;

    instance.$on(event1, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult.id === props.documents[0]._id && testResult.edit, `Found result ${JSON.stringify(testResult)}`);
  });

  it(`${compName} input fires "${event2}"`, async function () {
    const target = component.querySelector(eventTarget2);
    let testResult;

    instance.$on(event2, function (ev) {
      testResult = ev.detail;
    });

    target.click();
    assert.ok(testResult.id === props.documents[0]._id, `Found result ${JSON.stringify(testResult)}`);
  });

});