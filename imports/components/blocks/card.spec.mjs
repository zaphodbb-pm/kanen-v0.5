/**
 * Component test file.
 *
 * @memberof Components:Blocks
 * @augments card
 * @locus server based test
 *
 */


//* boilerplate support functions imports needed to test svelte files **********
import {mount} from "dainte";
import assert from "assert";
//import {tick} from "svelte";      // optional wait method

//** add our local support functions relative to testing directory
import {fileAbsolutePath} from "../../../tests/functions/fileAbsolutePath.mjs";
import {checkDOM} from "../../../tests/functions/domUtilities.mjs";
//* end of boilerplate *********************************************************


//* define component under test (cut)
const directory = '/imports/components/blocks'
const component = "card";        //******* define component name here

//* since this runs on the server, we need to use absolute paths to get the component
const cut = fileAbsolutePath(`${directory}/${component}.svelte`);

//* set up incoming props to be used by component
const opts = {
    props: {
        id: "card-test",
        text: {
            title: {en: "Card Title"},
            image: fileAbsolutePath("/public/default-test-image.jpg"),
            footer: {en: ["Saver", "Ed", "Del"]}
        }
    }
};

//* compile component with "dainte" npm package
const {instance, document} = await mount(cut, opts);



//* start tests for component under test
describe(`component ${component}.svelte`, function () {

    it("check class", function () {
        const out = checkDOM.getAttribute(document, "div", "class");
        assert.match(out, /card card-test/);
    });

    it("check card title", function () {
        const out = document.querySelector(".card-header-title");
        assert.strictEqual(out.innerHTML, opts.props.text.title.en);
    });

    it("check card image", function () {
        const out = checkDOM.getAttribute(document, ".card-image img", "src");
        assert.match(out, /default-test-image.jpg/);
    });

    it("check card footer", function () {
        const out = document.querySelectorAll(".card-footer-item");

        let btns = [];
        out.forEach( item => btns.push( item.innerHTML.trim() ) );

        assert.deepStrictEqual(btns, opts.props.text.footer.en);
    });

    it("click footer options", async function () {
        const id = opts.props.id;
        const labels = opts.props.text.footer.en;

        //** prepare event listener and test incoming event
        instance.$on("footEvent", msg => {
            const test = {...msg.detail};
            const key = test.key ?? 0;

            assert.deepStrictEqual( {...msg.detail}, {item: id, key: key, label: labels[key]});
        });

        //** get footer and click available buttons
        const out = document.querySelector(".card-footer");

        out.childNodes.forEach( item => {
            item.click();
        });
    });

});

