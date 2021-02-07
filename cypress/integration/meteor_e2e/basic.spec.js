/**
 * Basic Cypress test
 */




describe('Basic Cypress Test', () => {
    it('This is a basic test', () => {
        expect(true).to.equal(true);
    });



    it("Get home page", () => {
        cy.visit('/home');

        cy.contains('Kanen - A Seedling Starter Package');
    });
})
