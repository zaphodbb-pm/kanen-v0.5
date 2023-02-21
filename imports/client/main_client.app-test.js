// @ts-nocheck
console.log("in main client full app test");

/* adjust css for Mocha report */
window.addEventListener("DOMContentLoaded", function(){
    const report = document.getElementById("mocha-report");
    report.style.columns = "auto 20rem";
});

/* import required support files */
import {Meteor} from "meteor/meteor";
import {goto} from  'svelte-pathfinder';
import assert from "assert";


//const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));


describe("run tests", function () {
    let user;

    it("in client mode", function () {
        assert.strictEqual(Meteor.isClient, true);
    });

    it("ensure tester is logged in", function(){
        user = Meteor.userId();
        assert.ok(user, `Tester should be logged in as "administrator".`)
    })

    after(async function () {

        if(user){
            await goto("/home");
            await import("../both/Pages/Home/tests/homePage.test");

            await goto("/template");
            await import("../both/Pages/Template/tests/templatePage.test");

            /*

            await goto("/icons");
            console.log("icons page");

             */

        }

    });
});


