/**
 * Home Page test using Cypress.io.
 * Also test page structure with Navbar and Footer.
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */


describe('Page Home exists', () => {

    const TITLE = "Kanen - A Seedling Starter Package" // common title

    it("Get home page", () => {

        //** get page and silence pwa and gdpr requests
        cy.visit('/home');
        //cy.get('.dismiss-pwa').click();
        //cy.get('#gdprAsk .delete').click();

        cy.contains(TITLE);
    });
})
