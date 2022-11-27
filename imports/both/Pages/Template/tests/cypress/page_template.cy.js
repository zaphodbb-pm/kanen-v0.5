/**
 * Template Page test using Cypress.io.
 *
 * @memberOf tests
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */

const pageName = "Template";
const pageLink = "/template";
const pageTitle = "Template Page";
const pageExamples = "Examples"
const pageProps = "Component Properties"

describe(`Page: ${pageName}`, () => {

    it(`Get ${pageName} page`, () => {
        cy.visit(pageLink);

        cy.contains(pageTitle);
        cy.contains(pageExamples);
        cy.contains(pageProps);

        cy.get("table").should('have.class', 'table is-striped');

        cy.get('h3').each($hdr => {
            assert.isString($hdr[0].innerText, '')
        });
    });
})
