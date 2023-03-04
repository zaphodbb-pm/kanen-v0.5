/* file constants */
const pageName = "admin-panel";

const navLinks = 7;
const hasHdrSubTitle = false;
const hasHdrBody = false;


let main;
let heading;
let reportbox;
let infobox;
let gauge;
let charts;

/* support functions */
import {goto} from  'svelte-pathfinder';
import {waitFor} from "../../../../Components/tests/waitFor";


/* import support files for existence check */
import {header, page} from "../adminPanel_text";
import {nav, link, icon, roles} from "../adminPanel_nav";
import route from "../adminPanel_route";
import loader from "../adminPanel_loader.svelte";


/* perform page tests */
import assert from "assert";


describe(`page: ${pageName}`, function () {

    /* load page, wait for svelte to finish building the page and then extract regions to investigate */
    before( async function(){
        await goto("/" + pageName);
        await waitFor(50);

        heading = document.querySelector(".page-header");
        main = document.querySelector(".main-content");

        reportbox = document.querySelector("[data-tp_reportbox]");
        infobox = document.querySelector("[data-tp_infobox]");
        gauge = document.querySelector("[data-tp_gauge]");
        charts = document.querySelector("[data-tp_charts]");
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

        it("has report boxes heading", function () {
            const hasH2 = reportbox.querySelector("h2");
            assert.ok(hasH2 && hasH2.innerHTML.length > 3, `Missing "h2" header.`);
        });

        it("has report boxes sections", function () {
            const sections = reportbox.querySelectorAll(".column");

            const hasPara = sections[0].querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing "p" paragraph.`);

            const hasBox = sections[1].querySelector(".reportbox");
            assert.ok(hasBox, `Missing "reportbox" component.`);

            const hasAccordions = sections[1].querySelectorAll(".accordion");
            assert.ok(hasAccordions && hasAccordions.length === 3, `Missing "accordion" components.`);

            const hasBox2 = sections[2].querySelector(".reportbox");
            assert.ok(hasBox2, `Missing "reportbox 2" component.`);

            const hasAccordions2 = sections[2].querySelectorAll(".accordion");
            assert.ok(hasAccordions2 && hasAccordions2.length === 3, `Missing "accordion 2" components.`);
        });

        it("has info boxes sections", function () {
            const sections = infobox.querySelectorAll(".column");

            const hasPara = sections[0].querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing "p" paragraph.`);

            const hasBox = sections[1].querySelector(".infobox");
            assert.ok(hasBox, `Missing "reportbox" component.`);

            const hasAccordions = sections[1].querySelectorAll(".accordion");
            assert.ok(hasAccordions && hasAccordions.length === 3, `Missing "accordion" components.`);

            const hasBox2 = sections[2].querySelector(".infobox");
            assert.ok(hasBox2, `Missing "reportbox 2" component.`);

            const hasAccordions2 = sections[2].querySelectorAll(".accordion");
            assert.ok(hasAccordions2 && hasAccordions2.length === 3, `Missing "accordion 2" components.`);
        });

        it("has gauge sections", function () {
            const sections = gauge.querySelectorAll(".column");

            const hasPara = sections[0].querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing "p" paragraph.`);

            const hasBox = sections[1].querySelector(".gauge-donut");
            assert.ok(hasBox, `Missing "gauge" component.`);

            const hasAccordions = sections[1].querySelectorAll(".accordion");
            assert.ok(hasAccordions && hasAccordions.length === 3, `Missing "accordion" components.`);

            const hasBox2 = sections[2].querySelector(".gauge-ring");
            assert.ok(hasBox2, `Missing "gauge 2" component.`);

            const hasAccordions2 = sections[2].querySelectorAll(".accordion");
            assert.ok(hasAccordions2 && hasAccordions2.length === 3, `Missing "accordion 2" components.`);

            const hasBox3 = sections[3].querySelector(".gauge-meter");
            assert.ok(hasBox3, `Missing "gauge 3" component.`);

            const hasAccordions3 = sections[3].querySelectorAll(".accordion");
            assert.ok(hasAccordions3 && hasAccordions3.length === 3, `Missing "accordion 3" components.`);
        });

        it("has charts sections", function () {
            const section0 = charts.querySelector(".column");

            const hasPara = section0.querySelector("p");
            assert.ok(hasPara && hasPara.innerHTML.length > 3, `Missing "p" paragraph.`);
        });

        let chartItem = "first";
        it(`has ${chartItem} chart`, function () {
            const hasChart = charts.querySelector("[data-tp_chart1]");
            assert.ok(hasChart, `Missing ${chartItem} "chart" component.`);

            const chart = hasChart.querySelector(".charts-wrapper table");
            assert.ok(chart, `Missing ${chartItem} "chart" table.`);

            const details = hasChart.querySelectorAll(".column details");
            assert.ok(details && details.length === 3, `Missing ${chartItem} "chart" details.`);
        });

        chartItem = "second";
        it(`has ${chartItem} chart`, function () {
            const hasChart = charts.querySelector("[data-tp_chart2]");
            assert.ok(hasChart, `Missing ${chartItem} "chart" component.`);

            const chart = hasChart.querySelector(".charts-wrapper table");
            assert.ok(chart, `Missing ${chartItem} "chart" table.`);

            const details = hasChart.querySelectorAll(".column details");
            assert.ok(details && details.length === 3, `Missing ${chartItem} "chart" details.`);
        });

        chartItem = "third";
        it(`has ${chartItem} chart`, function () {
            const hasChart = charts.querySelector("[data-tp_chart3]");
            assert.ok(hasChart, `Missing ${chartItem} "chart" component.`);

            const chart = hasChart.querySelector(".charts-wrapper table");
            assert.ok(chart, `Missing ${chartItem} "chart" table.`);

            const details = hasChart.querySelectorAll(".column details");
            assert.ok(details && details.length === 3, `Missing ${chartItem} "chart" details.`);
        });

        chartItem = "fourth";
        it(`has ${chartItem} chart`, function () {
            const hasChart = charts.querySelector("[data-tp_chart4]");
            assert.ok(hasChart, `Missing ${chartItem} "chart" component.`);

            const chart = hasChart.querySelector(".charts-wrapper table");
            assert.ok(chart, `Missing ${chartItem} "chart" table.`);

            const details = hasChart.querySelectorAll(".column details");
            assert.ok(details && details.length === 3, `Missing ${chartItem} "chart" details.`);
        });
    });

});