/**
 * Template Page test using Cypress.io.
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */

const pageName = "Template";
const pageLink = "/template";
const pageTitle = "Template Page";

describe(`Page: ${pageName} exists`, () => {

    it(`Get ${pageName} page`, () => {
        cy.visit(pageLink);
        cy.contains(pageTitle);
    });
})
