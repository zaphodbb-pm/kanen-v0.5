/**
 * Component test file.
 *
 * @memberof Components:Elements
 * @augments userCredit
 * @locus server based test
 *
 * @notes
 * 1. usage: <Icon class="extraClass" icon={iconName} />
 */


//* Step 1: boilerplate support functions imports needed to test svelte files **********

import {mount} from "dainte";
import assert from "assert";
//import {tick} from "svelte";      // optional wait method

//** add our local support functions relative to testing directory
import {fileAbsolutePath} from "../../../tests/functions/fileAbsolutePath.mjs";
//import {fileLoad} from "../../../tests/functions/fileLoad.mjs";
import {checkDOM} from "../../../tests/functions/domUtilities.mjs";

//* end of boilerplate *****************************************************************




//* Step 2: define component under test (cut) ******************************************

const directory = '/imports/components/elements'
const component = "userCredit";        //******* define component name here

//** since this runs on the server, we need to use absolute paths to get the component
const cut = fileAbsolutePath(`${directory}/${component}.svelte`);

//* end of component getter ***********************************************************




//* set up component's incoming props and compile component ***************************

const opts = {
    props: {
        text: {
            credits: "Credits"
        }
    }
};

//** compile component with "dainte" npm package
const {instance, document} = await mount(cut, opts);

//* end of component setup ************************************************************




//* run tests for component under test (cut)

describe(`${component}.svelte`, function () {

    it("check top", function () {
        let out = checkDOM.getAttribute(document, ".user-credit", "class");
        assert.match(out, /user-credit/);
    });


    /*

    it("check class", function () {
        let out = checkDOM.getAttribute(document, "svg", "class");
        assert.match(out, /fa-svelte home-solid /);
    });

    it("check viewbox", function () {
        let out = checkDOM.getAttribute(document, "svg", "viewBox");
        assert.strictEqual(out, "0 0 32 32");
    });

    it("verify icon loaded", function () {
        let out = checkDOM.getAttribute(document, "path", "d");
        assert.strictEqual(out.length, iconHome.icon[4].length);
    });

     */

});
