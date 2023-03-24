/* step 1: define component key parts */
const compName = "fileBrowse";
const parent = "div";
//const eventName = "on-inputentry";


/* step 2: construct test data */
const props = {
  field:     {
    field: "fileBrowseTest",
    fieldType: "fileInput",
    optional: true,

    adjustLabel: true,

    attributes: {},
    params: {
      format: "image",
      type: ["image.*"],

      //* include croppie setup
      croppie: {
        viewport: {width: 'auto', height: 300, type: 'square'},
        enableResize: true
      },
    },
    defaultValue: {name: "", src: ""},
    value: {name: "", src: ""},

    fileReader: {
      en: {
        file_too_long: "Can't load files larger than getImageSizeKB.  <br/>Size = ",
        file_wrong_type: "File type is not supported.  <br/>Type = ",
      }
    },
  },

  fieldText: {
    label: `${compName}`,
  },

  error: "",

  class: "test-form-field"
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);


/** import Component Under Test (CUT) **/
import CUT from '../fileBrowse.svelte';


/** render component with appropriate props **/
const instance = new CUT({
  target: document.getElementById(testId),
  props: props
});


/* step 4: perform tests */
import assert from "assert";

describe(`FormBuilder > fields component ${compName}.svelte`, function () {
  /** teher are 2 divs here, one for input and one for modal **/
  const sections = document.querySelectorAll(`#${testId} > ${parent}`);
  const component = sections[0];
  const modal = sections[1];

  it(`${compName} exists`, function () {
    assert.ok(component, `parent should be "${parent}" tag`);

    const hasModifier = component.classList.contains(props.class);
    assert.ok(hasModifier, `parent classes should be "${props.class}"`);
  });

  it(`${compName} structure`, function () {
    const button = component.querySelector(`.has-field-addons button[title=${props.field.field}]`);
    assert.ok(button, `CUT is missing "button" element`);
    assert.ok(button && button.innerHTML.includes("icon-bg"), `CUT is missing "icon" class`);

    const type = button.getAttribute("type");
    assert.ok(type && type === "button", `CUT is missing "type=button".`);

    const input = button.querySelector(`input`);
    assert.ok(input, `CUT is missing "input" element.`);

    const typeInput = input.getAttribute("type");
    assert.ok(typeInput && typeInput === "file", `CUT is missing "type=file".`);

    const className = input.classList.contains("input");
    assert.ok(className, `CUT is missing "class=input".`);

    const label = component.querySelector(`.has-field-addons label`);
    assert.ok(label, `CUT is missing "label" element`);

    const buttonCrop = component.querySelector(`.has-field-addons button:not([title=${props.field.field}])`);
    assert.ok(buttonCrop, `CUT is missing crop "button" element`);
    assert.ok(buttonCrop && buttonCrop.innerHTML.includes("icon-bg"), `CUT button crop is missing "icon" class`);
  });

  it(`${compName} crop modal`, function () {
    assert.ok(modal, `CUT is missing "modal" structure`);

    const card = modal.querySelector(`.modal-card`);
    assert.ok(card, `CUT is missing "modal-card" article element`);

    const img = card.querySelector(`img`);
    assert.ok(img, `CUT is missing "img" element`);
  });

  after(function(){
    document.getElementById(testId).remove();
  });

});