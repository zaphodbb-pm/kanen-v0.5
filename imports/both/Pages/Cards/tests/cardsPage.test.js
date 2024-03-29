/* file constants */
const pageName = "cards";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = true;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../cards_text";
import {nav, link, icon, roles} from "../cards_nav";
import route from "../cards_route";
import loader from "../cards_loader.svelte";


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

        it("has card one", function(){
            const card = main.querySelector("#cardOne");
            assert.ok(card, `Missing card one`);
            assert.ok(card.tagName === "ARTICLE", `Missing "article" tag`);

            const figure = card.querySelector("figure img");
            assert.ok(figure, `Missing figure`);

            const imgClass = figure.classList.contains("has-aspect-3x1");
            const imgSrc = figure.getAttribute("src").includes(".jpg");
            const imgAlt = figure.getAttribute("alt").length > 3;
            assert.ok(imgClass && imgSrc && imgAlt, `Missing "img" attributes`);

            const icon = card.querySelector(".level-start");
            assert.ok(icon.innerHTML.includes("icon-bg"), `Missing "icon" attributes`);
        });

        it("has card two", function(){
            const card2 = main.querySelector("#cardTwo");

            assert.ok(card2, `Missing card two`);
            assert.ok(card2.tagName === "ARTICLE", `Missing "article" tag`);

            const h3 = card2.querySelector("header > h3");
            assert.ok(h3 && h3.innerHTML.length > 3, `Missing header`);

            const subTitle = card2.querySelector("header > p");
            assert.ok(subTitle && subTitle.innerHTML.length > 3, `Missing sub-title`);

            const body = card2.querySelectorAll(".level-start span");
            const hasIcon = body[0].classList[0];
            assert.ok(hasIcon.includes("icon-bg"), "Missing icon in body.");

            const hasText = body && body[1] ? body[1].innerHTML.length > 3 : false;
            assert.ok(hasText, "Missing text body.");
        })
    });

    describe("card two footer check", function() {
        it("card two has footer", function(){
            const footer = main.querySelector("#cardTwo footer");
            assert.ok(footer, "Missing card footer.");
        });

        it("card two has footer buttons", function(){
            const buttons = main.querySelectorAll("#cardTwo footer button");
            const hasButtons = buttons && buttons.length === 2;
            assert.ok(hasButtons, "Missing card footer buttons.");
        });
    });

});