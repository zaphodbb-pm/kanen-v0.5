/* step 1: define component key parts */
const compName = "card";
const parent = "article";
const imgClass = "has-aspect-3x1";


/* step 2: construct test data */
const props = {
  text:{
    title: "Card Title",
    subtitle: "Card Sub-Title",
    body: "Hello World",
    image: "/default-test-image.jpg",
    altImage: "Soulful looking puppy",
    footer: [
      {class: "is-primary has-hover", text: "Save"},
      {class: "is-danger-outlined has-hover", text: "Delete"},
    ]
  },

  id: "card-test",

  class: "test-card"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../card.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* step 4: perform tests */
import assert from "assert";

describe(`component ${compName}.svelte`, function () {
  let component;

  it(`${compName} exists`, function () {
    component = document.querySelector(`#${testId} > ${parent}`);
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok( hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    component = document.querySelector(`#${testId} > ${parent}`);
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
    component = document.querySelector(`#${testId} > ${parent}`);
    const slot = component.querySelector("div");
    assert.ok( slot, `CUT is missing slot "div"`);
  });

  it(`${compName} footer`, function () {
    component = document.querySelector(`#${testId} > ${parent}`);
    const footer = component.querySelector("footer");
    assert.ok( footer, `CUT is missing "footer"`);
  });


  /*
  it(`${compName} children of ${firstChildName}`, function () {
    const body = component.querySelectorAll(firstChildName);
    assert.ok( body.length === props.content.length, `Should have ${props.content.length} "${firstChildName}" children`);

    for( let i = 0; i < body.length; i++){
      const child = body[i];
      assert.ok(child.classList.contains(firstChildClasses), `firstChild classes should include "${firstChildClasses}"`);
      assert.ok(child.classList.contains(props.content[i].style), `firstChild classes should include "${props.content[i].style}"`);

      const summary = child.querySelector(ChildName0);
      assert.ok(summary, `summary should be "${ChildName0}" tag`);

      const spans = summary.querySelectorAll(":scope > span");
      assert.ok(spans[0].classList.contains(props.content[i].icon), `label icon should be "${props.content[i].icon}"`);
      assert.ok(spans[1].innerHTML === props.content[i].label, `label text should be "${props.content[i].label}"`);

      const div = child.querySelector(ChildName1);
      assert.ok(div, `text should be "${ChildName1}" tag`);
      assert.ok(div.innerHTML === props.content[i].text, `text should be "${props.content[i].text}"`);
    }
  });


   */
});



/*
<article class="card test-card" id="card-test">
  <figure>
    <img class="has-aspect-3x1" src="/default-test-image.jpg" alt="Soulful looking puppy">
  </figure>

  <header>
    <h3>Card Title</h3>
    <p>Card Sub-Title</p>
  </header>

  <div></div>
  <footer>
    <button type="button" class="is-primary has-hover">Save </button>
    <button type="button" class="is-danger-outlined has-hover">Delete </button>
  </footer>
</article>
 */