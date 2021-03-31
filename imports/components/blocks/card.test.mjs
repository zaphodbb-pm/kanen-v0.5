//* boilerplate imports need to test svelte files
import assert from "assert";

//import {fileLoad} from "../../../tests/functions/fileLoad.mjs";
import {fileAbsolutePath} from "../../../tests/functions/fileAbsolutePath.mjs";
import {buildDOM} from "../../../tests/functions/domBuild.mjs"
import {checkDOM} from "../../../tests/functions/domUtilities.mjs"
//* end of boilerplate


//* need to use absolute file path from project root
const component = fileAbsolutePath("/imports/components/blocks/card.svelte");

//const component = './card.svelte'



//const iconHome = fileLoad("/public/svg_to_js/home-solid.json", true);

//* build component with jsdom
const options = { text: "card", id: "12345" };
const domStart = buildDOM( component, options);

//* start tests for component icon.svelte
describe("component card", function () {

    console.log("in describe", domStart);


    /*
    it("check class", function () {
        let out = checkDOM.getAttribute(domStart, "svg", "class");
        assert.match(out, /home-solid fa-svelte/);
    });

    it("check viewbox", function () {
        let out = checkDOM.getAttribute(domStart, "svg", "viewBox");
        assert.strictEqual(out, "0 0 32 32");
    });

    it("verify icon loaded", function () {
        let out = checkDOM.getAttribute(domStart, "path", "d");
        assert.strictEqual(out.length, iconHome.icon[4].length);
    });

     */

});
