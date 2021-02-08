/**
 * Basic Cypress test
 */




describe('Basic Cypress Test', () => {
    it('This is a basic test', () => {
        expect(true).to.equal(true);
    });

    it("Get home page", () => {

        //** get page and silence pwa and gdpr requests
        cy.visit('/home');
        cy.get('.dismiss-pwa').click();
        cy.get('#gdprAsk .delete').click();

        cy.contains('Kanen - A Seedling Starter Package');
    });
})
