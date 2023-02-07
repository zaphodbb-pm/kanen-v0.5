import assert from "assert";
import HTMLParser from 'html-to-json-parser'; // see https://github.com/yousufkalim/html-to-json for documentation


/* expected component key parts */
const compName = "charts";
const parent = "div";
const parentClasses = "charts-wrapper";

const firstChildName = "table";
const firstChild0 = "caption";
const firstChild1 = "thead";
const firstChild2 = "tbody";

/* test data */
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





/* boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from './buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../widgets/charts.svelte';

/** render component with appropriate props **/
new CUT({
  target: document.getElementById(testId),
  props: props
});



/* finally, perform tests */
describe(`component ${compName}.svelte`, async function () {
  let component, body, result, content;

  /* get rendered component and parse to JSON object */
  before(async function () {
    component = document.getElementById(testId);
    result = await HTMLParser(component.innerHTML, false);
  });

  it(`${compName} exists`, function () {
    const isParent = (result.type === parent);
    assert.ok( isParent, `parent should be "${parent}" tag`);

    const hasClasses = result.attributes?.class.trim().includes(`${parentClasses} ${props.class}`);
    assert.ok( hasClasses, `parent classes should be "${parentClasses}"`);

    const content = result.content;
    assert.ok(Array.isArray(content), `parent should have an array of children`);

    body = content.filter( item => typeof item === "object");
  });

  it(`${compName} firstChild is a table`, function () {
    const firstChild = body[0];
    content = firstChild.content.filter( item => typeof item === "object");

    const isFirstChild = (firstChild.type === firstChildName);
    assert.ok( isFirstChild, `firstChild should be "${firstChildName}" tag`);

    const firstChildClasses = props.config.modifiers;
    const hasClasses = firstChild.attributes?.class.trim().includes(firstChildClasses);
    assert.ok( hasClasses, `firstChild classes should be "${firstChildClasses}"`);

    const hasStyles = firstChild.attributes?.style.trim();
    const hasMax = `--chart-max:${ (props.payload.max).toString()}`;
    const hasColumns = `--column-count:${ (props.payload.value[0].length - 1 ).toString()}`;
    assert.ok(hasStyles.includes(hasMax), `"${firstChildName}" should include "${hasMax}"`);
    assert.ok(hasStyles.includes(hasColumns), `"${firstChildName}" should include "${hasColumns}"`);
  });


  it(`${compName} firstChild has caption`, function () {
    assert.ok( content[0].type === firstChild0, `firstChild child[0] should be "${firstChild0}"`);

    const hasCaptionText = content[0].content[0] === props.text.caption;
    assert.ok( hasCaptionText, `firstChild child[0] caption should be "${props.text.caption}"`);
  });


  it(`${compName} firstChild has thead`, function () {
    assert.ok( content[1].type === firstChild1, `firstChild child[1] should be "${firstChild1}"`);

    const theadContent = content[1].content.filter( item => typeof item === "object");
    const tr = theadContent[0];
    assert.ok( tr.type === "tr", `thead child should be "tr"`);

    const trContent = tr.content.filter( item => typeof item === "object");
    const th = trContent.map( item => item.type);
    assert.ok( th.every( item => item === "th"), `thead every child should be "th"`);

    const thCell = trContent.map( item => item.content[0]);
    assert.deepStrictEqual(thCell, props.text.labelsColumn, `thead th labels should be "${props.text.labelsColumn}"`);

    const thScope = trContent.map( item => item.attributes?.scope);
    assert.ok( thScope.every( item => item === "col"), `thead every child scope should be "col"`);
  });


  it(`${compName} firstChild has tbody`, function () {
    assert.ok( content[2].type === firstChild2, `firstChild child[2] should be "${firstChild2}"`);

    const tbodyContent = content[2].content.filter( item => typeof item === "object");

    const tr = tbodyContent.map( item => item.type);
    const trLength = props.payload.value.length;
    assert.ok( tr.every( item => item === "tr") && tr.length === trLength, `thead tr should be ${trLength} items`);

    const rows = tbodyContent.map( item => item.content);
    const trRows = rows.filter( item => typeof item === "object");


    /* walk through payload matrix */
    for( let i = 0; i < trRows.length; i++){
      const cols = trRows[i].filter( item => typeof item === "object");

      const first = cols.shift();
      assert.ok(first.type === "th", `thead tr first cell should be "th"`);
      assert.ok(first.content[0] === props.text.labelsRow[i], `thead tr first cell should be "th"`);
      assert.ok(first.attributes.scope === "row", `thead tr first cell should be "row" scoped`);

      for( let k = 0; k < props.payload.value[i].length; k++){
        assert.ok( cols[k].type === "td", `thead tr child should be "td"`);

        const tdAttr = cols[k].attributes.style;
        const payload = props.payload.value[i][k].toString();

        assert.ok(tdAttr.includes("--td-start"), `Row ${i} Column ${k} td style should include "--td-start" value`);
        assert.ok(tdAttr.includes(`--td-value:${payload}`), `Row ${i} Column ${k} td style should include "--td-value" with value ${payload}`);
      }
    }
  });

});