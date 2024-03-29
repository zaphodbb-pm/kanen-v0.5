/* file constants */
const pageName = "colours";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = true;

const tp_main_columns = 3;
const tp_rows = 7;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../colours_text";
import {nav, link, icon, roles} from "../colours_nav";
import route from "../colours_route";
import loader from "../colours_loader.svelte";


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

        it(`has h2 elements`, function () {
            const h2 = main.querySelector("h2");
            assert.ok(h2 && h2.innerHTML.length > 2,  `Should have an "h2" element.`);
        });

        it(`has columns of colours`, function () {
            const columns = main.querySelectorAll(".column");
            const check = columns && columns.length === tp_main_columns;
            assert.ok(check,  `Should have ${tp_main_columns} columns, found ${columns.length}.`);

            columns.forEach(item => {
                const h3 = item.querySelector("h3");
                assert.ok(h3 && h3.innerHTML.length > 2,  `Should have an "h3" element.`);

                const div = item.querySelectorAll("div");
                const checkDiv = div && div.length === tp_rows;
                assert.ok(checkDiv,  `Should have ${tp_rows} rows, found ${div?.length ?? 0}.`);

                const label = item.querySelectorAll("p");
                const checkLabels = label && label.length === tp_rows;
                assert.ok(checkLabels,  `Should have ${tp_rows} labels, found ${label?.length ?? 0}.`);
            });
        });
    });

});