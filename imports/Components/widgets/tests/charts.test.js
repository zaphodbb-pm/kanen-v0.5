/* step 1: define component key parts */
const compName = "charts";
const parent = "div";
const parentClasses = ["charts-wrapper"];

const firstChildName = "table";
const firstChild0 = "caption";
const firstChild1 = "thead";
const firstChild2 = "tbody";


/* step 2: construct test data */
const props = {
  text: {
    caption: "CUT",
    labelsColumn: ["Quarters", "2017", "2018", "2019", "2020"],
    labelsRow: ["Q1", "Q2", "Q3", "Q4"]
  },

  config: {type: "line", modifiers: "multiple show-caption show-labels show-grid", showLegend: true},

  payload: {
    value: [
      [3, 4, 5, 6, 7],
      [4, 5, 6, 7, 8],
      [5, 6, 7, 9, 9],
      [6, 7, 8, 9, 10]
    ],
    max: 10
  },

  class: "test-class",
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../charts.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* step 4: perform tests */
import assert from "assert";

describe(`component ${compName}.svelte`, async function () {
  let component;

  it(`${compName} exists`, function () {
    component = document.querySelector(`#${testId} > ${parent}`);
    assert.ok(component, `parent should be "${parent}" tag`);
  });

  it(`${compName} parent classes`, function () {
    parentClasses.forEach( item => {
      assert.ok( component.classList.contains(item), `parent classes should include "${item}"`);
    });

    assert.ok( component.classList.contains(props.class), `parent classes should include "${props.class}"`);
  });

  it(`${compName} firstChild is a ${firstChildName} with classes`, function () {
    const firstChild = component.querySelector(firstChildName);
    assert.ok( firstChild, `firstChild should be "${firstChildName}" tag`);

    let modifiers = props.config.modifiers.split(" ");
    modifiers = [...modifiers, `${compName}-${props.config.type}`]

    modifiers.forEach( item => {
      assert.ok( firstChild.classList.contains(item), `firstChild classes should include "${item}"`);
    });

    const styles = firstChild.getAttribute("style");
    const style1 = `--chart-max:${props.payload.max}`;
    const style2 = `--column-count:${props.payload.value[0].length - 1 }`;
    assert.ok( styles.includes(style1) && styles.includes(style2), `firstChild style should include "${style1}" and "${style2}"`);
  });

  it(`${compName} firstChild has ${firstChild0}`, function () {
    const caption = component.querySelector(firstChild0);
    assert.ok( caption, `${firstChildName} should have child "${firstChild0}" tag`);
    assert.ok(caption.innerHTML === props.text.caption, `${firstChild0} text should be "${props.text.caption}"`)
  });

  it(`${compName} firstChild has ${firstChild1}`, function () {
    const thead = component.querySelector(firstChild1);
    assert.ok( thead, `${firstChildName} should have child "${firstChild1}" tag`);

    const tr = thead.querySelectorAll("tr");
    assert.ok( tr && tr.length === 1, `${firstChild1} child should be "tr"`);

    const th = thead.querySelectorAll("th");
    const labels = props.text.labelsColumn;
    th.forEach( (item, idx) => {
      assert.ok( item.innerHTML === labels[idx], `thead th label should be "${labels[idx]}"`);
      assert.ok(item.getAttribute("scope") === "col", `thead every th scope should be "col"`);
    });
  });

  it(`${compName} firstChild has ${firstChild2}`, function () {
    const tbody = component.querySelector(firstChild2);
    assert.ok( tbody, `${firstChildName} should have child "${firstChild2}" tag`);

    const tr = tbody.querySelectorAll("tr");
    const trLength = props.payload.value.length;
    assert.ok( tr && tr.length === trLength, `${firstChild1} child should be ${trLength} rows`);

    /* walk through payload matrix */
    for( let i = 0; i < trLength; i++){
      const th = tr[i].querySelector("th");
      assert.ok(th, `tbody tr first cell should be "th"`);
      assert.ok(th.innerHTML === props.text.labelsRow[i], `tbody tr th text should be "${props.text.labelsRow[0]}"`);
      assert.ok(th.getAttribute("scope") === "row", `tbody tr th should be "row" scoped`);

      const td = tr[i].querySelectorAll("td");
      assert.ok(td.length === props.payload.value[i].length, `tbody tr should have ${props.payload.value[i].length} "td"s`);

      for( let k = 0; k < props.payload.value[i].length; k++){
        const tdAttr = td[k].getAttribute("style");
        const payload = props.payload.value[i][k].toString();
        const inner = td[k].innerText;

        assert.ok(tdAttr.includes("--td-start"), `Row ${i} Column ${k} td style should include "--td-start" value`);
        assert.ok(tdAttr.includes(`--td-value:${payload}`), `Row ${i} Column ${k} td style should include "--td-value" with value ${payload}`);
        assert.ok(inner === payload, `Row ${i} Column ${k} td text should be "${payload}"`)
      }
    }
  });

  it(`${compName} has legend`, function () {
    const ul = component.querySelector("ul");
    assert.ok(ul, `legend should be "ul" tag`);

    const label = ul.getAttribute("aria-label");
    assert.ok(label === "Chart Legend", `Aria legend should be "Chart Legend"`);

    const li = ul.querySelectorAll("li");

    li.forEach( (item, idx) => {
      const label = props.text.labelsRow[idx];
      assert.ok( item.innerHTML === label, `Legend item ${idx} should have label "${label}"`);
    });
  });

});