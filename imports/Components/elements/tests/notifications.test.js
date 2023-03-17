/* step 1: define component key parts */
const compName = "notifications";
const parent = "div";


/* step 2: construct test data */
const props = {
  text: {read: "Dismiss"}
}


/* step 3: run boilerplate activities */
import { Meteor } from 'meteor/meteor';
import sinon from "sinon";

/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../notifications.svelte';



/* step 4: perform tests */
import assert from "assert";
let instance;
let component;
let stub;

describe(`component ${compName}.svelte`, function () {

  before(function(){
    stub = sinon.stub(Meteor, "callAsync").returns([]);

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

    const hasModifier = component.classList.contains("dropdown");
    assert.ok( hasModifier, `parent classes should be "dropdown"`);
  });

  it(`${compName} structure`, async function () {
    const dropdown = component.querySelector(".dropdown-trigger");
    assert.ok(dropdown, `CUT is missing "dropdown-trigger" element.`);

    const tabIndex = dropdown.getAttribute("tabindex");
    assert.ok(tabIndex, `CUT is missing "tabIndex" attribute.`);

    const button = dropdown.querySelector(".button");
    assert.ok(button, `CUT is missing "menu" button element.`);

    const popup = button.getAttribute("aria-haspopup");
    assert.ok(popup, `CUT is missing "aria-haspopup" attribute.`);

    const controls = button.getAttribute("aria-controls");
    assert.ok(controls, `CUT is missing "aria-controls" attribute.`);

    const figure = dropdown.querySelector("figure");
    assert.ok(figure, `CUT is missing "figure" element.`);
    assert.ok(figure.innerHTML.includes(("icon-bg")), `CUT is missing icon "span" class.`);
    assert.ok(figure.innerHTML.includes(("badge")), `CUT is missing badge "span" class.`);
  });

  it(`${compName} menu`, async function () {
    const menu = component.querySelector(".dropdown-menu > nav");
    assert.ok(menu, `CUT is missing "dropdown-menu nav" element.`);

    const articles = menu.querySelector("article");
    assert.ok(articles, `CUT is missing "article" elements.`);
  });


  after(function(){
    stub.restore();
  })
});