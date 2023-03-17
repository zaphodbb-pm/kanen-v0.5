/* step 1: define component key parts */
const compName = "userProfile";
const parent = "a";
const parentClasses = "user-profile";


/* step 2: construct test data */
const props = {
  text: {
    toProfile: "Profile",
    signIn: "Sign In",
    logOut: "Log Out",
    changePassword: "Change Password",
    title: "user image"
  }
}


/* step 3: run boilerplate activities */
/** add component test area to body **/
import {buildComponentTestArea} from '../../tests/buildComponentTestArea';
const testId = buildComponentTestArea(compName, document);

/** import Component Under Test (CUT) **/
import CUT from '../userProfile.svelte';

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

    const hasCompClass = component.classList.contains(parentClasses);
    assert.ok( hasCompClass, `parent classes should be "${parentClasses}"`);
    assert.ok( component.innerHTML.includes("icon-bg"), `CUT is missing icon class.`);

  });

});