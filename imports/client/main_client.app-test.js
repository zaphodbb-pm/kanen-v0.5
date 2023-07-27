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


describe("run basic client tests", function () {
    let user;

    it("in client mode", function () {
        assert.strictEqual(Meteor.isClient, true);
    });

    it("ensure tester is logged in", function () {
        user = Meteor.userId();
        assert.ok(user, `Tester should be logged in as "administrator".`)
    });

    after(async function () {
        if (user) {
            await import("./tests/readStoreDoc.test");

            await import("./tests/userMgmt.test");
        }
    });

});




describe("run page tests", function () {
    let user;

    it("ensure tester is logged in", function(){
        user = Meteor.userId();
        assert.ok(user, `Tester should be logged in as "administrator".`)
    })

    after(async function () {

        if(user) {
            await import("../both/PageStructure/tests/appStructure.test");

            //** common pages
            await import("../both/Pages/Home/tests/homePage.test");

            await import("../both/Pages/Login/tests/loginPage.test");

            await import("../both/Pages/MyProfile/tests/myProfilePage.test");

            await import("../both/Pages/ChangePassword/tests/changePasswordPage.test");

            //** admin pages
            await import("../both/Pages/Users/tests/usersPage.test");

            await import("../both/Pages/SysConfig/tests/sysConfigPage.test");

            await import("../both/Pages/ExportImport/tests/exportImportPage.test");

            //** application pages
            await import("../both/Pages/Articles/tests/articlesPage.test");
            await import("../both/Pages/ArticlesSearch/tests/articlesSearchPage.test");
            await import("../both/Pages/ArticlesShow/tests/articlesShowPage.test");

            await import("../both/Pages/CookingNow/tests/cookingNowPage.test");
            await import("../both/Pages/CookingNowSearch/tests/cookingNowSearchPage.test");

            await import("../both/Pages/Magazines/tests/magazinesPage.test");
            await import("../both/Pages/MagazinesSearch/tests/magazinesSearchPage.test");

            await import("../both/Pages/News/tests/newsPage.test");
            await import("../both/Pages/NewsSearch/tests/newsSearchPage.test");

            await import("../both/Pages/Recipes/tests/recipesPage.test");
            await import("../both/Pages/RecipesSearch/tests/recipesSearchPage.test");
            await import("../both/Pages/RecipesShow/tests/recipesShowPage.test");

            await import("../both/Pages/TestKitchen/tests/testKitchenPage.test");
            await import("../both/Pages/TestKitchenSearch/tests/testKitchenSearchPage.test");
            await import("../both/Pages/TestKitchenShow/tests/testKitchenShowPage.test");

            await import("../both/Pages/Favourites/tests/favouritesPage.test");
            await import("../both/Pages/RecipeBox/tests/recipeBoxPage.test");
        }

    });
});
