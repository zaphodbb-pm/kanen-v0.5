/* step 1: define component key parts */
const compName = "gdprNotice";
const parent = "div";
const eventName = "gdpr-cookie";

const text = {
  elementId: "gdprAsk",

  title: "Cookies & Privacy Policy",

  msg: "This website stores cookies on your computer. These cookies are used to collect information about " +
      "how you interact with our website and allow us to remember you. We use this information in order to improve and " +
      "customize your browsing experience.  " +
      'Learn more about how to <a href="https://cookiesandyou.com/" target="_blank" rel="noopener">manage</a> your cookies.',

  btnAccept: "Accept",

  btnDecline: "Decline",

  debug: false
};

/* step 2: construct test data */
const props = {
  text: text
}


/* step 3: run boilerplate activities */
import {waitFor} from "../../tests/waitFor";

/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../gdprNotice.svelte';



/* step 4: perform tests */
import assert from "assert";
let instance;
let component;


describe(`component ${compName}.svelte`, function () {

  before(function(){
    window.localStorage.clear();

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

    const hasModifier = component.classList.contains("cookie");
    assert.ok( hasModifier, `parent classes should be "cookie"`);

    component = component.querySelector("aside");
    assert.ok(component, `child should be "aside" element`);
  });

  it(`${compName} structure`, async function () {
    const header = component.querySelector("header > h2");
    assert.ok(header, `CUT is missing "header" and "h2" elements.`);

    const hdrButton = component.querySelector("header > button");
    assert.ok(hdrButton, `CUT is missing "header button".`);
    assert.ok(hdrButton.getAttribute("type") === "button", `CUT "header button" should have "type=button".`);
    assert.ok(hdrButton.classList.contains("delete"), `CUT "header button" should be "class=delete".`);

    const body = component.querySelector(".message-body");
    assert.ok(body, `CUT is missing "message-body" div.`);

    const hasText = body.querySelector("p");
    assert.ok(hasText && hasText.innerHTML.length > 20, `CUT is "message-body" paragraph text.`);

    const buttons = body.querySelectorAll("button");
    assert.ok(buttons && buttons.length === 2, `CUT is missing "button"s.`);

    const type0 = buttons[0].getAttribute("type");
    assert.ok( type0 && type0 === "button", `CUT button0 is missing "type=button".`);

    const type1 = buttons[1].getAttribute("type");
    assert.ok( type1 && type1 === "button", `CUT button1 is missing "type=button".`);
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const button = component.querySelectorAll("button");

    let testResult = [];

    instance.$on(eventName, function (ev) {
      testResult.push(ev.detail);
    });

    button[0].click();
    button[1].click();
    button[2].click();

    await waitFor(50);

    assert.ok( testResult[0] && testResult[0] === "postpone" , `instance event found ${testResult[0]}`);
    assert.ok( testResult[1] && testResult[1] === "decline" , `instance event found ${testResult[1]}`);
    assert.ok( testResult[2] && testResult[2] === "accept" , `instance event found ${testResult[2]}`);
  });


  after(function(){
    const test = document.getElementById(testId);
    test.remove();

    window.localStorage.clear();
  })
});