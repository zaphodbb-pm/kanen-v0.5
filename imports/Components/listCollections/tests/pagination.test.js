/* step 1: define component key parts */
const compName = "pagination";
const parent = "div > nav";
const parentClass = "pagination";
const eventName = "page-changed";

const listLength = 7;


/* step 2: construct test data */
const props = {
  rows: 10,
  totalDocs: 66
};


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../pagination.svelte';


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
    const ul = component.querySelector(`ul`);
    assert.ok( ul, `CUT is missing "ul" element.`);

    const li = component.querySelectorAll(`ul > li`);
    assert.ok( li && li.length === listLength, `CUT has ${li.length} items, but should have ${listLength} items.`);

    li.forEach( (item, idx) => {
      const link = item.querySelector("a");
      assert.ok(link, `CUT is missing "li ${idx}" child link`);

      switch(idx){
        case 0:
          assert.ok(item.classList.contains("prev"), `Link ${idx} does not have "class=prev".`);
          assert.ok(item.innerHTML.includes("&lt;"), `Link ${idx} does not have "innerHTML=&lt;".`);
          break;

        case 1:
          assert.ok(link.classList.contains("is-current"), `Link ${idx} does not have "class=is-current".`);
          assert.ok(link.innerHTML.includes("1"), `Link ${idx} does not have "innerHTML=1".`);
          break;

        case listLength - 1:
          assert.ok(item.classList.contains("next"), `Link ${idx} does not have "class=next".`);
          assert.ok(item.innerHTML.includes("&gt;"), `Link ${idx} does not have "innerHTML=&gt;".`);
          break

        default:
          assert.ok(!link.classList.contains("is-current"), `Link ${idx} should not have "class=is-current".`);
          assert.ok(link.innerHTML.includes(idx.toString()), `Link ${idx} does not have "innerHTML=${idx}".`);
      }
    });
  });

  it(`${compName} input fires "${eventName}"`, async function () {
    const li = component.querySelectorAll(`ul > li > a`);
    let testResult;

    instance.$on(eventName, function (ev) {
      testResult = ev.detail;
    });

    /** pick a page and check event **/
    let page = 3;
    li[page].click();
    let msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);

    /** go to a previous page **/
    page = 2;
    li[0].click();
    msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);

    /** go to a next page **/
    page = 3;
    li[listLength - 1].click();
    msg = `Expected ${JSON.stringify({page: page} )}, but found ${JSON.stringify(testResult)}`;
    assert.deepStrictEqual(testResult, {page: page}, msg);
  });

  after(function(){
    document.getElementById(testId).remove();
  });

});