/* file constants */
const pageName = "documentation";

const navLinks = 7;
const hasHdrSubTitle = true;
const hasHdrBody = false;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../documentation_text";
import {nav, link, icon, roles} from "../documentation_nav";
import route from "../documentation_route";
import loader from "../documentation_loader.svelte";


/* perform page tests */
import assert from "assert";


describe(`page: ${pageName}`, function () {

    /* load page, wait for svelte to finish building the page and then extract regions to investigate */
    before( async function(){
        await goto("/" + pageName);
        await waitFor(50);

        heading = document.querySelector(".page-header");
        main = document.querySelector(".main-content");
    });

    describe("page support files", function(){
        it(`has "${pageName}_text"`, function () {
            assert.ok(header && typeof header === "object", `Missing "header text"`);
            assert.ok(page && typeof page === "object", `Missing "page text"`);
        });

        it(`has "${pageName}_nav"`, function () {
            assert.ok(nav && typeof nav.en === "string", `Missing "nav" text`);
            assert.ok(link && typeof link === "string", `Missing "link" text`);
            assert.ok(icon && typeof icon === "string", `Missing "icon" name`);
            assert.ok(roles && Array.isArray(roles.read), `Missing "roles.read" array`);
            assert.ok(roles && Array.isArray(roles.write), `Missing "roles.write" array`);
        });

        it(`has "${pageName}_route"`, function () {
            const keys = route && typeof route === "object" ? Object.keys(route) : [];
            assert.ok(keys && keys.length === navLinks, `Missing "route" fields, length should be ${keys.length}`);
        });

        it(`has "${pageName}_loader"`, function () {
            assert.ok(loader && typeof loader === "function", `Missing svelte page loader file`);
        });
    });

    describe("header check", function(){
        it("has header", function () {
            assert.ok(heading, `Missing page header region`);
        });

        it("header", function () {
            const h1 = heading.querySelector("h1");
            const hasH1 = h1 && typeof h1.innerHTML === "string" && h1.innerHTML.length > 2;
            assert.ok(hasH1, `Incorrect h1: "${h1.innerHTML}."`);
        });

        if(hasHdrSubTitle) {
            it("sub-title", function () {
                const pST = heading.querySelector("p.sub-title");
                let hasST = true;

                if (pST) {
                    hasST = typeof pST.innerHTML === "string" && pST.innerHTML.length > 2;
                }

                assert.ok(hasST, `Mis-formed sub-title: "${pST.innerHTML}."`);
            });
        }

        if(hasHdrBody) {
            it("heading body", function(){
                const body = heading.querySelector("p:not(.sub-title)");
                let hasBody = true;

                if(body){
                    hasBody = typeof body.innerHTML === "string" && body.innerHTML.length > 2;
                }

                assert.ok(hasBody, `Mis-formed heading body: "${body.innerHTML}."`);
            })
        }
    });

    describe("main-content check", function(){
        it("has main", function () {
            assert.ok(main, `Missing ".main-content" region.`);
        });

        it("has commentary region", function () {
            const commentary = main.querySelector("[data-tp_commentary]")
            assert.ok(commentary, `Missing commentary region.`);
        });

        it("has paragraphs", function () {
            const paragraphs = main.querySelectorAll("[data-tp_commentary] p")
            assert.ok(paragraphs && paragraphs.length === 2, `Missing paragraphs.`);
        });

        it("has commentary list", function () {
            const list = main.querySelector("[data-tp_list]")
            assert.ok(list, `Missing list region`);
        });

        it("has bullets", function () {
            const bullets = main.querySelectorAll("[data-tp_list] li")
            assert.ok(bullets && bullets.length === 3, `Missing list bullet items.`);
        });

        it("has doc nav", function () {
            const nav = main.querySelector("[data-tp_docnav] .accordions")
            assert.ok(nav, `Missing doc navigation region.`);
        });

        it("has doc nav blocks", function () {
            const blocks = main.querySelectorAll("[data-tp_docnav] .accordion");
            assert.ok(blocks && blocks.length > 3, `Missing doc nav links.`);
        });

        it("has doc nav", function () {
            const nav = main.querySelector("[data-tp_docnav] .accordions")
            assert.ok(nav, `Missing doc navigation region.`);
        });

        it("has paged content", function () {
            const content = main.querySelector("[data-tp_paged_content]");
            assert.ok(content, `Missing "pagged content" region.`);
        });

        it("has paged content blocks", function () {
            const blocks = main.querySelectorAll("[data-tp_paged_content] .pagedContent");
            assert.ok(blocks && blocks.length > 3, `Missing paged content blocks.`);
        });
    });

});