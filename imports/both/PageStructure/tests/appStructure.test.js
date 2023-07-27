/* file constants */
const pageName = "App Structure";

const condensedLinks = 5;
const widgetItems = 2;
const rightNavItems = 2;
//const sideNavBlocks = 5;
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
//import {allAdmin} from "../../../Components/tests/linkRoles";


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
            const hasLogo = left_a && left_a.outerHTML.includes('href="/home"');
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
            const items = widgets.querySelectorAll(".widgetbar-radios");

            const check = items && items.length === widgetItems;
            assert.ok(check,  `Should have ${widgetItems} widgets, found ${widgets.length}.`);
        });
    });

    describe("footer check", function(){
        it("has footer", function () {
            assert.ok(footer, `Missing footer region`);
        });

        it("footer has paragraphs", function(){
            const div = footer.querySelectorAll("div");
            assert.ok(div && div.length === 4, `Missing footer regions`);
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


    /*
    describe("has GDPR area", function(){
        it("has GDPR", function () {
            assert.ok(GDPR, `Missing GDPR region`);

            localStorage.setItem(gdprId, gdprState);
        });
    });

     */

});