/* file constants */
const pageName = "icons";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = true;

const tp_icons = 68;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../icons_text";
import {nav, link, icon, roles} from "../icons_nav";
import route from "../icons_route";
import loader from "../icons_loader.svelte";


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

        it("has icons region", function () {
            const iconsRegion = main.querySelector("[data-tp_icons]");
            assert.ok(iconsRegion, `Missing "icons" region`);

            const icons = iconsRegion.querySelectorAll(".icon-nav");
            assert.ok(icons && icons.length === tp_icons, `Expected ${tp_icons} icons definitions but found ${icons.length}.`);

            icons.forEach( (item) => {
                const icon = item.querySelector("span").getAttribute("class");
                assert.ok(icon.includes("icon-bg-"), `"span" tag is missing or has malformed icon value`);

                const label = item.querySelector("p").innerHTML;
                assert.ok(label.includes("icon-bg-"), `"p" tag is missing or has malformed icon label`);
            });
        });

    });

});