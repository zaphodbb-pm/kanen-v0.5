/* file constants */
const pageName = "users";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;

let main;
let heading;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../users_text";
import {nav, link, icon, roles} from "../users_nav";
import route from "../users_route";
import loader from "../users_loader.svelte";

import {pageConfig} from "../users_config";
import schema from "../users_form_schema";
import list from "../users_list";


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

        it(`has "${pageName}_config"`, function () {
            assert.ok(pageConfig && typeof pageConfig === "object", `Missing component config file`);
        });

        it(`has "${pageName}_schema"`, function () {
            assert.ok(schema && typeof schema === "object", `Missing form schema file`);
        });

        it(`has "${pageName}_list"`, function () {
            assert.ok(list && typeof list === "object", `Missing list file`);
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

        it("has list holder", function () {
            const hasList = main.querySelector("[data-tp_list_holder]");
            assert.ok(hasList, `Missing "listHolder" region`);
        });

        it("has form holder", function () {
            const hasForm = main.querySelector("[data-tp_form_holder]");
            assert.ok(hasForm, `Missing "formHolder" region`);
        });

       it("has all required form fields", function () {
           const fields = main.querySelector("[data-tp_form_holder]");

           schema.forEach( item => {
               const hasField = fields.querySelector(`.fieldname--${item.field}`);

               if(!item.listen){
                   assert.ok(hasField, `Missing field ${item.field}.`);
               }
           });
       });

       it("has form footer", function () {
           const hasFormFooter = main.querySelector(".form-footer");
           assert.ok(hasFormFooter, `Missing "formHolder footer" region.`);
       });

       it("has form footer submit", function () {
           const hasFormFooterSubmit = main.querySelector(".form-footer .submit-buttons");
           assert.ok(hasFormFooterSubmit, `Missing "formHolder footer submit buttons" region.`);
       });
    });

});