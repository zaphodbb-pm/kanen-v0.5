/* file constants */
const pageName = "learn";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;

let main;
let heading;
let queryBar;
let toc;
let content;
let modal;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../learn_text";
import {nav, link, icon, roles} from "../learn_nav";
import route from "../learn_route";
import loader from "../learn_loader.svelte";


/* perform page tests */
import assert from "assert";


describe(`page: ${pageName}`, function () {

    /* load page, wait for svelte to finish building the page and then extract regions to investigate */
    before( async function(){
        await goto("/" + pageName);
        await waitFor(50);

        heading = document.querySelector(".page-header");
        main = document.querySelector(".main-content");
        queryBar = document.querySelector(".main-content");
        toc = document.querySelector(".main-content [data-tp_wiki_toc]");
        content = document.querySelector(".main-content [data-tp_wiki_content]");
        modal = document.querySelector(".main-content [data-tp_modal_user]");
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
            assert.ok(hasH1, `Incorrect h1: "${h1.innerHTML}"`);
        });

        if(hasHdrSubTitle) {
            it("sub-title", function () {
                const pST = heading.querySelector("p.sub-title");
                let hasST = true;

                if (pST) {
                    hasST = typeof pST.innerHTML === "string" && pST.innerHTML.length > 2;
                }

                assert.ok(hasST, `Mis-formed sub-title: "${pST.innerHTML}"`);
            });
        }

        if(hasHdrBody) {
            it("heading body", function(){
                const body = heading.querySelector("p:not(.sub-title)");
                let hasBody = true;

                if(body){
                    hasBody = typeof body.innerHTML === "string" && body.innerHTML.length > 2;
                }

                assert.ok(hasBody, `Mis-formed heading body: "${body.innerHTML}"`);
            })
        }
    });

    describe("main-content check", function(){
        it("has main", function () {
            assert.ok(main, `Missing ".main-content" region`);
        });

        it("has query bar", function () {
            assert.ok(queryBar, `Missing "query bar" region.`);

            const labels = queryBar.querySelectorAll("form label");
            assert.strictEqual(labels.length, 3, `Expected 3 inputs but found ${labels.length}.`);
        });

        it("has table of contents", function () {
            assert.ok(toc, `Missing "table of contents" region.`);

            const tocHdr = toc.querySelector("header");
            assert.ok(tocHdr, `Missing "toc header" region.`);

            const tocList = toc.querySelector(".toc-content ul");
            assert.ok(tocList, `Missing "toc header" region.`);
        });

        it("has content display", function () {
            assert.ok(content, `Missing "content display" region.`);

            const contentHdr = content.querySelector("h2");
            assert.ok(contentHdr, `Missing "content header" region.`);

            const contentInfo = content.querySelector(".level .level-end");
            assert.ok(contentInfo, `Missing "content info" bar.`);
        });

        it("has user modal", function () {
            assert.ok(modal, `Missing "modal user" component.`);

            const contentHdr = modal.querySelector("h2");
            assert.ok(contentHdr, `Missing "content header" region.`);

            const contentInfo = modal.querySelector(".level-start");
            assert.ok(contentInfo, `Missing "user info" region.`);
        });
    });

});