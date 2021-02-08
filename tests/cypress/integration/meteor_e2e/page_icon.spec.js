/**
 * Page Icon Test
 */


describe('Page: Icon Test', () => {
    it("Check icon count", () => {

        //** get page and silence pwa and gdpr requests
        cy.visit('/icons');
        cy.get('.dismiss-pwa').click();
        cy.get('#gdprAsk .delete').click();

        //** make sure that page has header information
        cy.get('.content-header').should('contain', "Icons Page");

        //** test-point: make sure we are showing the correct number of icons
        cy.get('[data-testid=icon-block]').should("have.lengthOf", 66);
    });
})
