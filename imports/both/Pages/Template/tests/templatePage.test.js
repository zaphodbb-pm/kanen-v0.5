/* file constants */
const pageName = "template";

const navLinks = 8;
const hasHdrSubTitle = true;
const hasHdrBody = true;

const tp_main_columns = 2;
const tp_headings = 2;
const tp_rows = 8;
const tp_articles = 4;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {pageConfig} from "../template_config";
import {header, page} from "../template_text";
import {nav, link, query, icon, roles} from "../template_nav";
import route from "../template_route";
import loader from "../template_loader.svelte";


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
        it(`has "${pageName}_config`, function () {
            assert.ok(pageConfig && typeof pageConfig === "object", `Missing "pageConfig`);
        });

        it(`has "${pageName}_text`, function () {
            assert.ok(header && typeof header === "object", `Missing "header text"`);
            assert.ok(page && typeof page === "object", `Missing "page text"`);
        });

        it(`has "${pageName}_nav`, function () {
            assert.ok(nav && typeof nav.en === "string", `Missing "nav" text`);
            assert.ok(link && typeof link === "string", `Missing "link" text`);
            assert.ok(query && typeof query === "string", `Missing "query" text`);
            assert.ok(icon && typeof icon === "string", `Missing "icon" name`);
            assert.ok(roles && Array.isArray(roles.read), `Missing "roles.read" array`);
            assert.ok(roles && Array.isArray(roles.write), `Missing "roles.write" array`);
        });

        it(`has "${pageName}_route`, function () {
            const keys = route && typeof route === "object" ? Object.keys(route) : [];
            assert.ok(keys && keys.length === navLinks, `Missing "route" fields, length should be ${keys.length}`);
        });

        it(`has "${pageName}_loader`, function () {
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

        it("has column regions", function () {
            const columns = main.querySelectorAll("[data-tp_main] .column");
            assert.strictEqual(columns.length, tp_main_columns, `Expected ${tp_main_columns} columns but found ${columns.length}.`);
        });
    });



    /* optional page files / page specific requirements */
    import _info from "../template_info.svelte";

    describe("additional component checks", function(){
        it(`has optional file '${pageName}_info'`, function () {
            assert.ok(_info && typeof _info === "function", `Missing optional file "${pageName}_info"`);
        });

        it(`has optional file '${pageName}_info' loaded`, function () {
            const opt1 = main.querySelector("[data-tp_info]");
            assert.ok(opt1 && typeof opt1 === "object", `Optional file not in DOM`);
        });

        it(`has h2 elements`, function () {
            const h2 = main.querySelectorAll("[data-tp_info] h2");
            assert.strictEqual(h2.length, tp_headings, `Should have only ${tp_headings} h2's.`);

            h2.forEach( item => {
                const check = item && typeof item.innerHTML === "string" && item.innerHTML.length > 2;
                assert.ok( check, `Should have text of sufficient length.`, )
            })
        });

        it(`has table, thead and tbody elements`, function () {
            const table = main.querySelector("[data-tp_info] table");
            assert.ok(table, `Should have a table element.`);

            const thead = table.querySelector("thead");
            assert.ok(thead, `Should have a thead element.`);

            const tbody = table.querySelector("tbody");
            assert.ok(tbody, `Should have a tbody element.`);

            const tr = tbody.querySelectorAll("tr");
            assert.strictEqual(tr.length, tp_rows, `Should have ${tp_rows} rows in tbody, found ${tr.length} rows.`);
        });

        it(`has region of articles`, function () {
            const regions = main.querySelectorAll("[data-tp_info] article");
            assert.strictEqual(regions.length, tp_articles, `Should have ${tp_articles} "article" tags, found ${regions.length} "article"s.`);
        });

        it(`has structured articles`, function () {
            const regions = main.querySelectorAll("[data-tp_info] article");
            regions.forEach( item => {
                const heading = item.querySelector("h3");
                assert.ok(heading, `"article" should have an "h3" element.`);

                const code = item.querySelector("pre code");
                assert.ok(code, `"article" should have "pre code" elements.`);
            });
        });
    });

});
