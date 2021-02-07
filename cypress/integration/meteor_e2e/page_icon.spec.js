/**
 * Page Icon Test
 */


describe('Page: Icon Test', () => {
    it("Check icon count", () => {
        cy.visit('/icons');

        cy.get('.dismiss-pwa').click();

        cy.get('#gdprAsk .delete').click();

        cy.get('.content-header').should('contain', "Icons Page");

        cy.get('.test-point-icon').should("have.lengthOf", 66);
    });
})
