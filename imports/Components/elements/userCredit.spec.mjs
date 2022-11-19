/**
 * Component test file.
 *
 * @name userCredit.spec
 * @private
 * @memberOf Components:elements
 * @locus test
 *
 * @notes
 */


//* Step 1: boilerplate support Functions imports needed to test svelte files **********

import {mount} from "dainte";
import assert from "assert";
//import {tick} from "svelte";      // optional wait method

//** add our local support Functions relative to testing directory
import {fileAbsolutePath} from "../../../tests/functions/fileAbsolutePath.mjs";
import {checkDOM} from "../../../tests/functions/domUtilities.mjs";

//* end of boilerplate *****************************************************************




//* Step 2: define component under test (cut) ******************************************

const directory = '/imports/Components/elements'
const component = "userCredit";        //******* define component name here

//** since this runs on the server, we need to use absolute paths to get the component
const cut = fileAbsolutePath(`${directory}/${component}.svelte`);

//* end of component getter ***********************************************************




//* set up component's incoming props and compile component ***************************
import {fileLoad} from "../../../tests/functions/fileLoad.mjs";
//import {setContext, getContext} from "svelte";
import {writable} from 'svelte/store'

const iconCredits = fileLoad("/public/svg_to_js/coins-solid.json", true);


const opts = {
    props: {
        text: {
            credits: "Credits"
        }
    }
};

//** compile component with "dainte" npm package
const {instance, document} = await mount(cut, opts);

//console.log("instance", instance);

//console.log("document", document);

let context = new Map();
context.set("iconCredits", "iconCredits");



instance.$$.context = context;


//import {userExtras} from "../../client/systemStores.mjs";


//setContext("iconCredits", iconCredits);

//instance.$setContext({iconCredits: iconCredits});
//let userExtras = writable( {} );
//userExtras.set( {extras: "extras"});

//console.log("instance", instance, userExtras);


//console.log("getContext", getContext("iconCredits") );



//userExtras


//* end of component setup ************************************************************




//* run tests for component under test (cut)

describe(`${component}.svelte`, function () {

    it("check top", function () {

        console.log("it context", instance.$$.context.get("iconCredits"));


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
