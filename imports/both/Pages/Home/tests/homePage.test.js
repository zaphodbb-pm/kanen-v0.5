/* file constants */
const pageName = "home";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;

const tp_main_columns = 2;
const tp_notes_columns = 3;
const tp_tabs = 5;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../home_text";
import {nav, link, icon, roles} from "../home_nav";
import route from "../home_route";
import loader from "../home_loader.svelte";


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

        it("has main column regions", function () {
            const mainColumns = main.querySelectorAll("[data-tp_main] .column");
            assert.strictEqual(mainColumns.length, tp_main_columns, `Expected ${tp_main_columns} columns but found ${mainColumns.length}.`);

            const content = mainColumns[0].innerHTML;
            assert.ok(content.length > 100, `Expected more content.`);

            const figure = mainColumns[1].querySelector("figure");
            const isFigure = !!figure;
            const hasSrc = figure.innerHTML.includes('img src="/');
            const hasAlt = figure.innerHTML.includes('alt="');
            const figCheck = isFigure && hasSrc && hasAlt;

            assert.ok(figCheck, `Figure not structured properly.`);
        });


        it("has notes sections", function () {
            const notes = main.querySelector("[data-tp_notes]");
            assert.ok(notes, `Missing "notes" region.`);

            const notesColumns = notes.querySelectorAll("section");
            assert.strictEqual(notesColumns.length, tp_notes_columns, `Expected ${tp_notes_columns} columns but found ${notesColumns.length}.`);
        });


        it("has tabbed region", function () {
            const tabs = main.querySelector("[data-tp_tabs]");

            const h3 = tabs.querySelector("h3");
            assert.ok(h3 && h3.innerHTML.length > 3, `Missing "h3" or heading text.`);

            const labels = tabs.querySelectorAll(".tabs input");
            assert.ok(labels && labels.length === tp_tabs, `Expected ${tp_tabs} tabs but found ${labels.length}.`);

            const labelsLi = tabs.querySelectorAll(".tabs > ul > li");
            assert.ok(labelsLi && labelsLi.length === tp_tabs, `Expected ${tp_tabs} tabs ul li but found ${labelsLi.length}.`);

            const sections = tabs.querySelectorAll(".tabs .tab-content section");
            assert.ok(sections && sections.length === tp_tabs, `Expected ${tp_tabs} tab-content sections but found ${sections.length}.`);

            sections.forEach((item, idx) => {
                const h3 = item.querySelector("h3");
                assert.ok( h3 && h3.innerHTML.length > 3, `Tab-content ${idx} missing heading.`);

                const p = item.querySelector("p");
                assert.ok( p && p.innerHTML.length > 3, `Tab-content ${idx} missing paragraph text.`);

                const ul = item.querySelector("ul");
                assert.ok( ul && ul.innerHTML.length > 3, `Tab-content ${idx} missing list text.`);
            })
        });
    });

});