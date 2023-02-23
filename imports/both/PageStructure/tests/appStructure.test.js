/* file constants */
const pageName = "App Structure";

const condensedLinks = 5;
const widgetItems = 2;
const rightNavItems = 2;
const sideNavBlocks = 5;
const gdprId = "gdpr-accept-decline-gdprAsk";

let navbar;
let condensedNavbar;
let widgets;
let sidenav;
let sidebarMenu;
let footer;
let systemMessages;
let PWA;
let GDPR;
let gdprState;


/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../Components/tests/waitFor";
import {allAdmin} from "../../../Components/tests/linkRoles";


/* perform page tests */
import assert from "assert";


describe(`${pageName}`, function () {

    /* load page, wait for svelte to finish building the page and then extract regions to investigate */
    before( async function(){
        gdprState = localStorage.getItem(gdprId);
        localStorage.removeItem(gdprId);

        await goto("/home");
        await waitFor(100);

        navbar = document.querySelector(".navbar");
        condensedNavbar = document.querySelector(".condensed-navbar");
        widgets = document.querySelector(".widgetbar");
        sidenav = document.querySelector(".page-sidenav");
        sidebarMenu = document.querySelector(".sidebarMenu");
        footer = document.querySelector(".page-footer");
        systemMessages = document.querySelector(".system-messages");
        PWA = document.querySelector("#modal_pwa");
        GDPR = document.querySelector(".cookie");
    });

    describe("navbar check", function(){
        it("has navbar", function () {
            assert.ok(navbar, `Missing navbar region`);
        });

        it("has navbar-left", function () {
            const left = navbar.querySelector(".navbar-left");
            assert.ok(left, `Missing navbar left region`);
        });

        it("has navbar-left logo", function () {
            const left_a = navbar.querySelector(".navbar-left > a");
            const hasLogo = left_a && left_a.innerHTML.includes('src="logo');
            assert.ok(hasLogo, `Missing navbar-left logo`);
        });

        it("has navbar-right", function () {
            const right = navbar.querySelector(".navbar-right");
            assert.ok(right, `Missing navbar right region`);
        });

        it(`has ${rightNavItems} navbar-right units`, function () {
            const rightItems = navbar.querySelectorAll(".navbar-right .button");
            const check = rightItems && rightItems.length === rightNavItems;
            assert.ok(check,  `Should have ${rightNavItems} columns, found ${rightItems.length}.`);
        });
    });

    describe("condensed navbar check", function(){
        it("has condensed navbar", function () {
            assert.ok(condensedNavbar, `Missing condensed navbar region`);
        });

        it(`has ${condensedLinks} condensed navbar links`, function () {
            const links = condensedNavbar.querySelectorAll("a");

            const check = links && links.length === condensedLinks;
            assert.ok(check,  `Should have ${condensedLinks} columns, found ${links.length}.`);

            links.forEach( item => {
                const test = item.innerHTML && item.innerHTML.includes("icon-bg");
                assert.ok(test, `Missing icon for link or link is malformed.`);
            });
        });
    });

    describe("widget bar check", function(){
        it("has widget bar", function () {
            assert.ok(widgets, `Missing widgets bar region`);
        });

        it(`has ${widgetItems} widgets`, function () {
            const items = widgets.querySelectorAll("form");

            const check = items && items.length === widgetItems;
            assert.ok(check,  `Should have ${widgetItems} widgets, found ${widgets.length}.`);
        });
    });

    describe("sidenav check", function(){
        it("has sidenav", function () {
            assert.ok(sidenav, `Missing sidenav region`);
        });

        it(`sidenav has ${sideNavBlocks} blocks of links`, function () {
            const blocks = sidenav.querySelectorAll(".sidenavs nav");

            const check = blocks && blocks.length === sideNavBlocks;
            assert.ok(check,  `Should have ${sideNavBlocks} columns, found ${blocks.length}.`);
        });

        it(`sidenav has ${allAdmin.length} links`, function () {
            const links = sidenav.querySelectorAll(".sidenavs ul > li");

            const checkLinks = links && links.length === allAdmin.length;
            assert.ok(checkLinks,  `Should have ${allAdmin.length} columns, found ${links.length}.`);

            links.forEach( item => {
                const child = item.firstChild;

                assert.ok(child.classList.contains("icon-nav-horz"), "Incorrect class name for icon display in link.");

                let link = child.getAttribute("href");
                link = link.includes("?") ? link.split("?")[0] : link;
                const checkLink = allAdmin.includes(link);
                assert.ok(checkLink, `Link ${link} is not in approved list.`);

                const title = child.getAttribute("title");
                const inner = child.innerHTML;
                const hasIcon =  inner.includes("icon-bg");
                const hasLabel = inner.includes(title);
                assert.ok(hasIcon && hasLabel, `Missing icon class or label on link "${link}".`)
            });
        });

    });

    describe("sliding sidebar menu check", function(){
        it("has sidebar menu", function () {
            assert.ok(sidebarMenu, `Missing "sidebarMenu" region.`);
        });

        it(`sidebarMenu has ${sideNavBlocks} blocks of links`, function () {
            const blocks = sidebarMenu.querySelectorAll(".sidenavs nav");

            const check = blocks && blocks.length === sideNavBlocks;
            assert.ok(check,  `Should have ${sideNavBlocks} columns, found ${blocks.length}.`);
        });

        it(`sidebarMenu has ${allAdmin.length} links`, function () {
            const links = sidebarMenu.querySelectorAll(".sidenavs ul > li");

            const checkLinks = links && links.length === allAdmin.length;
            assert.ok(checkLinks,  `Should have ${allAdmin.length} columns, found ${links.length}.`);

            links.forEach( item => {
                const child = item.firstChild;

                assert.ok(child.classList.contains("icon-nav-horz"), "Incorrect class name for icon display in link.");

                let link = child.getAttribute("href");
                link = link.includes("?") ? link.split("?")[0] : link;
                const checkLink = allAdmin.includes(link);
                assert.ok(checkLink, `Link ${link} is not in approved list.`);

                const title = child.getAttribute("title");
                const inner = child.innerHTML;
                const hasIcon =  inner.includes("icon-bg");
                const hasLabel = inner.includes(title);
                assert.ok(hasIcon && hasLabel, `Missing icon class or label on link "${link}".`)
            });
        });

    });

    describe("footer check", function(){
        it("has footer", function () {
            assert.ok(footer, `Missing footer region`);
        });

        it("footer has paragraphs", function(){
            const p = footer.querySelectorAll("p");
            assert.ok(p && p.length === 3, `Missing footer paragraphs`);
        });
    });

    describe("has system message area", function(){
        it("has messages", function () {
            assert.ok(systemMessages, `Missing system messages aside region`);
        });
    });

    describe("has PWA area", function(){
        it("has PWA", function () {
            assert.ok(PWA, `Missing PWA region`);
        });
    });

    describe("has GDPR area", function(){
        it("has GDPR", function () {
            assert.ok(GDPR, `Missing GDPR region`);

            localStorage.setItem(gdprId, gdprState);
        });
    });

});