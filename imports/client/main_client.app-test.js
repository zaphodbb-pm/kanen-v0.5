// @ts-nocheck
console.log("in main client full app test");

/* adjust css for Mocha report */
window.addEventListener("DOMContentLoaded", function(){
    const report = document.getElementById("mocha-report");
    report.style.columns = "auto 20rem";
});

/* import required support files */
import {Meteor} from "meteor/meteor";
import assert from "assert";


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

        if(user) {
            await import("../both/PageStructure/tests/appStructure.test");

            await import("../both/Pages/Home/tests/homePage.test");

            await import("../both/Pages/Template/tests/templatePage.test");

            await import("../both/Pages/Icons/tests/iconsPage.test");

            await import("../both/Pages/Colours/tests/coloursPage.test");

            await import("../both/Pages/FooterExtras/tests/footerExtrasPage.test");

            await import("../both/Pages/Learn/tests/learnPage.test");

            await import("../both/Pages/Testing/tests/testingPage.test");

            await import("../both/Pages/Cards/tests/cardsPage.test");

            await import("../both/Pages/WidgetsContent/tests/widgetsContent.test");

            await import("../both/Pages/AdminPanel/tests/adminPanelPage.test");

            await import("../both/Pages/Starter/tests/starterPage.test");

            await import("../both/Pages/PubSub/tests/pubSubPage.test");

            await import("../both/Pages/Login/tests/loginPage.test");

            await import("../both/Pages/MyProfile/tests/myProfilePage.test");

            await import("../both/Pages/ChangePassword/tests/changePasswordPage.test");

            await import("../both/Pages/BuildContent/tests/buildContentPage.test");

            await import("../both/Pages/Documentation/tests/documentationPage.test");

            await import("../both/Pages/Users/tests/usersPage.test");

            await import("../both/Pages/SysConfig/tests/sysConfigPage.test");

            await import("../both/Pages/ExportImport/tests/exportImportPage.test");

            await import("../both/Pages/LogsSystem/tests/logsSystemPage.test");
        }

    });
});


