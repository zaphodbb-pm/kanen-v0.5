/* step 1: define component key parts */
const compName = "modalUser";
const parent = "div";

const eventName = "modal-addEvent";
const eventName2 = "modal-removeEvent";
const eventName3 = "modalState";

const docInfo = {_id: "test-id"};

const modalText = {
  title: "Author Detail",

  username: "System User Name",
  name: "Full Name",

  image: "Photo",
  role: "Role",
  mainEmail: "Main Email",
  secondaryEmail: "Secondary Email",
  phone: "Phone",
  active: "Active",
  updatedAt: "Updated",

  addEvent: "Add",
  removeEvent: "Remove",

  noAccess: "You do not have the privileges to access to this information.",
  noUserFound: "Error: no user found"
};

/* step 2: construct test data */
const props = {
  showModal: true,
  docId: "DOCID1234",
  modalText: modalText
}


/* step 3: run boilerplate activities */
import {waitFor} from "../../tests/waitFor";
import { Meteor } from 'meteor/meteor';
import sinon from "sinon";

/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../modalUser.svelte';



/* step 4: perform tests */
import assert from "assert";
let instance;
let component;
let stub;

describe(`component ${compName}.svelte`, function () {

  before(function(){
    stub = sinon.stub(Meteor, "callAsync").returns(docInfo);

    /** render component with appropriate props **/
    instance = new CUT({
      target: document.getElementById(testId),
      props: props
    });

    /** get rendered component **/
    component = document.querySelector(`#${testId} > ${parent}`);
  });


  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains("modal-overlay");
    assert.ok( hasModifier, `parent classes should be "modal-overlay"`);
  });

  it(`${compName} structure`, async function () {
    await waitFor(50);        // allow time for component to hydrate structure

    const article = component.querySelector(".modal > article");
    assert.ok(article, `CUT is missing "article" element.`);

    const header = article.querySelector("header > h2");
    assert.ok(header, `CUT is missing "header" and "h2" elements.`);

    const table = article.querySelector("div > table");
    assert.ok(table, `CUT is missing "table" element.`);

    const cells  = table.querySelectorAll("td");
    assert.ok(cells && cells.length === 16, `CUT found ${cells.length} "td" elements, should be 16 "td" elements.`);

    const icon = article.querySelector("div > figure");
    assert.ok(icon, `CUT is missing icon "figure" element.`);
    assert.ok(icon.innerHTML.includes(("icon-bg")), `CUT is missing icon "span" class.`);

    const footer = article.querySelector("footer");
    assert.ok(footer, `CUT is missing "footer" element.`);

    const buttons = footer.querySelectorAll("button");
    assert.ok(buttons && buttons.length === 2, `CUT is missing "footer buttons"`);

    const type0 = buttons[0].getAttribute("type");
    assert.ok( type0 && type0 === "button", `CUT button0 is missing "type=button".`);

    const type1 = buttons[1].getAttribute("type");
    assert.ok( type1 && type1 === "button", `CUT button1 is missing "type=button".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const button = component.querySelectorAll("article footer button");

    let testResult;
    instance.$on(eventName, function (ev) {
      testResult= ev.detail;
    });

    button[0].click();

    assert.ok( testResult && testResult === docInfo._id , `instance event found ${testResult}`);
  });

  it(`${compName} input fires "${eventName2}"`, async function () {
    const button = component.querySelectorAll("article footer button");

    let testResult;
    instance.$on(eventName2, function (ev) {
      testResult= ev.detail;
    });

    button[1].click();

    assert.ok( testResult && testResult === docInfo._id , `instance event found ${testResult}`);
  });

  it(`${compName} input fires "${eventName3}"`, async function () {
    const button = component.querySelector("header button");

    let testResult;
    instance.$on(eventName3, function (ev) {
      testResult= ev.detail;
    });

    button.click();

    assert.ok( testResult === false , `instance event found ${testResult}`);
  });


  after(function(){
    stub.restore();
  })
});