import assert from "assert";

import {fileLoad} from "../../../tests/functions/fileLoad.mjs";
import {fileAbsolutePath} from "../../../tests/functions/fileAbsolutePath.mjs";
import {buildDOM} from "../../../tests/functions/domBuild.mjs"
import {checkDOM} from "../../../tests/functions/domUtilities.mjs"


//* need to use absolute file path from project root
const component = fileAbsolutePath("/imports/components/elements/icon.svelte");
const iconHome = fileLoad("/public/svg_to_js/home-solid.json", true);

//* build component with jsdom
const options = { icon: iconHome };
const domStart = buildDOM( component, options);

describe("component icon", function () {
    it("load svg file and verify path", function () {
        let out = checkDOM.getAttribute(domStart, "path", "d");
        assert.strictEqual(out.length, iconHome.icon[4].length);
    });
});
