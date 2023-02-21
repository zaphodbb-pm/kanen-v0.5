/* file constants */
const pageName = "home";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;

const tp_main_columns = 2;
const tp_headings = 2;
const tp_rows = 8;
const tp_articles = 4;



/* import support files for existence check */
import {header, page} from "../home_text";
import {nav, link, icon, roles} from "../home_nav";
import route from "../home_route";
import loader from "../home_loader.svelte";


/* perform page tests */
import assert from "assert";

describe(`page: ${pageName}`, function () {

    describe("page support files", function(){
        it(`has "${pageName}_text`, function () {
            assert.ok(header && typeof header === "object", `Missing "header text"`);
            assert.ok(page && typeof page === "object", `Missing "page text"`);
        });

        it(`has "${pageName}_nav`, function () {
            assert.ok(nav && typeof nav.en === "string", `Missing "nav" text`);
            assert.ok(link && typeof link === "string", `Missing "link" text`);
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
        const header = document.querySelector(".page-header");

        it("has header", function () {
            assert.ok(header, `Missing page header region`);
        });

        it("header", function () {
            const h1 = header.querySelector("h1");
            const hasH1 = h1 && typeof h1.innerHTML === "string" && h1.innerHTML.length > 2;
            assert.ok(hasH1, `Incorrect h1: "${h1.innerHTML}"`);
        });

        if(hasHdrSubTitle) {
            it("sub-title", function () {
                const pST = header.querySelector("p.sub-title");
                let hasST = true;

                if (pST) {
                    hasST = typeof pST.innerHTML === "string" && pST.innerHTML.length > 2;
                }

                assert.ok(hasST, `Mis-formed sub-title: "${pST.innerHTML}"`);
            });
        }

        if(hasHdrBody) {
            it("heading body", function(){
                const body = header.querySelector("p:not(.sub-title)");
                let hasBody = true;

                if(body){
                    hasBody = typeof body.innerHTML === "string" && body.innerHTML.length > 2;
                }

                assert.ok(hasBody, `Mis-formed heading body: "${body.innerHTML}"`);
            })
        }
    });

    describe("main-content check", function(){
        const main = document.querySelector(".main-content");

        it("has main", function () {
            assert.ok(main, `Missing ".main-content" region`);
        });

        const mainColumns = main.querySelectorAll("[data-tp_main] .column");
        it("has main column regions", function () {
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
    });




    /* optional page files / page specific requirements */
/*
import _info from "../../Template/template_info.svelte";

describe("optional file checks", function(){

    it(`has optional file '${pageName}_info'`, function () {
        assert.ok(_info && typeof _info === "function", `Missing optional file "${pageName}_info"`);
    });

    const opt1 = document.querySelector("[data-tp_block2]");

    it(`has optional file '${pageName}_info' loaded`, function () {
        assert.ok(opt1 && typeof opt1 === "object", `Optional file not in DOM`);
    });

    const h2 = opt1.querySelectorAll("h2");

    it(`has h2 elements`, function () {
        assert.strictEqual(h2.length, 2, `Should have only 2 h2's.`);
    });

   h2.forEach( item => {
       const check = item && typeof item.innerHTML === "string" && item.innerHTML.length > 2;
       assert.ok( check, `Should have text of sufficient length.`, )
   })
});

 */

});
