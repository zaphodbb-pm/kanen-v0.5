/**
 * Home Page test using Cypress.io.
 * Also test page structure with Navbar and Footer.
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */

const pageName = "Home";
const pageLink = "/home";
const pageTitle = "Kanen - A Seedling Starter Package";

describe(`Page: ${pageName} exists`, () => {

    it(`Get ${pageName} page`, () => {

        //** get page and silence pwa and gdpr requests
        cy.visit(pageLink);
        //cy.get('.dismiss-pwa').click();
        //cy.get('#gdprAsk .delete').click();

        cy.contains(pageTitle);
    });
})
