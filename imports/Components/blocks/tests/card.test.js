/* step 1: define component key parts */
const compName = "card";
const parent = "article";
const imgClass = "has-aspect-3x1";
const eventName = "footEvent";


/* step 2: construct test data */
const props = {
  text:{
    title: "Card Title",
    subtitle: "Card Sub-Title",
    body: "Hello World",
    image: "/default-test-image.jpg",
    altImage: "Soulful looking puppy",
    slot: "Some body text",
    footer: [
      {class: "is-primary has-hover", text: "Save"},
      {class: "is-danger-outlined has-hover", text: "Delete"},
    ]
  },

  id: "card-test",

  class: "test-card"
}

const checkClick = [
  {item: props.id, key: 0, label: props.text.footer[0].text},
  {item: props.id, key: 1, label: props.text.footer[1].text},
]


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../card.svelte';



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
    const figure = component.querySelector("figure");
    assert.ok( figure, `CUT is missing "figure"`);

    const img = component.querySelector("figure > img");
    assert.ok( img, `CUT is missing "figure > img"`);

    const src = img.getAttribute("src");
    assert.ok( src === props.text.image, `CUT has malformed "img.src"`);

    const alt = img.getAttribute("alt");
    assert.ok( alt === props.text.altImage, `CUT has malformed "img.alt"`);

    const aspect = img.classList;
    assert.ok( aspect.contains(imgClass), `CUT is missing class`);

    const hdr = component.querySelector("header");
    assert.ok( hdr, `CUT is missing "header"`);

    const h3 = hdr.querySelector("h3");
    assert.ok( h3 && h3.innerHTML.length > 3, `CUT is missing "h3"`);

    const subTitle = hdr.querySelector("p");
    assert.ok( subTitle && subTitle.innerHTML.length > 3, `CUT is missing sub-title`);
  });

  it(`${compName} slot`, function () {
    const slot = component.querySelector("div");
    assert.ok( slot, `CUT is missing slot "div"`);

    const body = slot.querySelector("p");
    assert.ok( body && body.innerHTML === props.text.slot, `CUT is missing slot "p" tag and text.`);
  });

  it(`${compName} footer`, function () {

    const footer = component.querySelector("footer");
    assert.ok( footer, `CUT is missing "footer"`);
  });

  it(`${compName} footer buttons`, async function () {
    const buttons = component.querySelectorAll("footer button");
    assert.ok(buttons && buttons.length === 2, `CUT is missing "footer buttons"`);
  });

  it(`${compName} footer button clicks on "${eventName}"`, async function () {
    const buttons = component.querySelectorAll("footer button");
    let testResult= [];

    instance.$on(eventName, function (ev) {
      testResult.push(ev.detail);
    });

    buttons[0].click();
    buttons[1].click();

    testResult.forEach( item => {
      const checkValue = checkClick[item.key];
      assert.deepStrictEqual(item, checkValue, `instance event is ${JSON.stringify(item)} but should be ${JSON.stringify(checkValue)}`);
    });
  });
});