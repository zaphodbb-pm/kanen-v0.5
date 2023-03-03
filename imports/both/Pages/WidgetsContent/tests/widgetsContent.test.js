/* file constants */
const pageName = "content-widgets";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;


/* support functions */
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

let main;
let heading;
let tabs;
let accordions;

import {goto} from  'svelte-pathfinder';


/* import support files for existence check */
import {header, page} from "../widgetsContent_text";
import {nav, link, icon, roles} from "../widgetsContent_nav";
import route from "../widgetsContent_route";
import loader from "../widgetsContent_loader.svelte";


/* perform page tests */
import assert from "assert";


describe(`page: ${pageName}`, function () {

    /* load page, wait for svelte to finish building the page and then extract regions to investigate */
    before( async function(){
        await goto("/" + pageName);
        await waitFor(50);

        heading = document.querySelector(".page-header");
        main = document.querySelector(".main-content");
        tabs = document.querySelector("[data-tp_tabbed_content]");
        accordions = document.querySelector("[data-tp_accordion_content]");
    });

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

        it("has tabbed content", function(){
            const hasH2 = tabs.querySelector("h2");
            assert.ok(hasH2 && hasH2.innerHTML.length > 3, `Missing "h2" header.`);

            const hasPara = tabs.querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing descriptive paragraph.`);

            const hasTabs = tabs.querySelectorAll(".tabs input");
            const tabItems = page?.components?.en?.tabbed ?? [];
            assert.ok(hasTabs && hasTabs.length === tabItems.length, `Found ${hasTabs.length}, should have ${tabItems.length} tabs.`);
        });

        it("has accordion content", function(){
            const hasH2 = accordions.querySelector("h2");
            assert.ok(hasH2 && hasH2.innerHTML.length > 3, `Missing "h2" header.`);

            const hasPara = accordions.querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing descriptive paragraph.`);

            const hasAccordions = accordions.querySelectorAll(".accordions details");
            const accordionItems = page?.components?.en?.tabbed ?? [];
            assert.ok(hasAccordions && hasAccordions.length === accordionItems.length, `Found ${hasAccordions.length}, should have ${accordionItems.length} items.`);
        });
    });

});