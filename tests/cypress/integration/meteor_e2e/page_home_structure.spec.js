/**
 * Home Page test using Cypress.io.
 * Also test page structure with Navbar and Footer.
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */




describe('Page: Home with Navbar and Footer Test', () => {

    const version = {
        APP_NAME: "Kanen",                          // application name
        VERSION: "0.2.5",                           // current version number
        COPYRIGHT: "2021",                          // adjustable copyright notice
    }

    const requiredLinks = ["/icons", "/colours", "/cards", "/content-widgets", "/widgets"];
    const requireSideLinks = ["/home", "/template", "/icons", "/colours", "/learn", "/cards", "/content-widgets", "/widgets", "/login"];

    beforeEach( () => {
        cy.visit('/home');
        cy.get('.dismiss-pwa').click();
        cy.get('#gdprAsk .delete').click();
    });

    it("Verify Navbar", () => {
        cy.log('Make sure we have a navbar');
        cy.get("[data-test=page-navbar").should("exist", true);

        cy.log("Ensure brand logo exists")
        cy.get("[data-test=navbar-brand-logo]")
            .then( (navbar) => {
                const brand = navbar.find('svg path').attr("d");
                expect(brand.length).to.be.greaterThan(1000);
            })

        cy.log("Ensure hamburger exists");
        cy.get('[data-test="navbar-hamburger"]').should("exist", true);

        cy.log("Inspect top condensed navbar");
        cy.get('[data-test="top-navbar-condensed"] [data-test="navbar-condensed"]')
            .then( (condensed) => {
                //** find navbar items
                let items = [];

                for( let i = 0; i < condensed.length; i++) {
                    items.push(Cypress.$(condensed[i])[0]);
                }

                return items;
            }).then( (items)  => {

            let links = [];
            let icons = [];

            Cypress.$(items).each( function(idx, elem){
                links.push( Cypress.$(elem).attr("href") );
                icons.push( Cypress.$(elem).find('svg path').attr("d").length );
            });

            const ensureLinks = links.every( l => requiredLinks.includes(l) );

            expect(ensureLinks, "Ensure links").to.be.true;
            expect(Math.min(...icons), "Ensure useful icons").to.be.greaterThan(100);
            });

        cy.log("Inspect bottom condensed navbar");
        cy.get('[data-test="bottom-navbar-condensed"] [data-test="navbar-condensed"]')
            .then( (condensed) => {
                //** find navbar items
                let items = [];

                for( let i = 0; i < condensed.length; i++) {
                    items.push(Cypress.$(condensed[i])[0]);
                }

                return items;
            }).then( (items)  => {

            let links = [];
            let icons = [];

            Cypress.$(items).each( function(idx, elem){
                links.push( Cypress.$(elem).attr("href") );
                icons.push( Cypress.$(elem).find('svg path').attr("d").length );
            });

            const ensureLinks = links.every( l => requiredLinks.includes(l) );

            expect(ensureLinks, "Ensure links").to.be.true;
            expect(Math.min(...icons), "Ensure useful icons").to.be.greaterThan(100);
        });
    });

    it("Verify Side Navbar", () => {
        cy.get('[data-test="aside-nav-wrapper"]')
            .should("exist", true)
            .find('[data-test="navbar-side-menu"]')
            .then( (sidenavs) => {
                //** find sidenavs items
                let items = [];

                for( let i = 0; i < sidenavs.length; i++) {
                    items.push(Cypress.$(sidenavs[i])[0]);
                }

                return items;
            }).then( (items)  => {

            let links = [];
            let icons = [];

            Cypress.$(items).each( function(idx, elem){
                links.push( Cypress.$(elem).attr("href") );
                icons.push( Cypress.$(elem).find('svg path').attr("d").length );
            });

            const ensureLinks = links.every( l => requireSideLinks.includes(l) );

            expect(ensureLinks, "Ensure links").to.be.true;
            expect(Math.min(...icons), "Ensure useful icons").to.be.greaterThan(100);
        });
    });

    it("Verify footer", () => {
        cy.get('[data-test="page-footer"] .level-right')
            .should('have.text', `${version.APP_NAME}: ${version.VERSION}`);

        cy.get('[data-test="page-footer"] .level-left')
            .should('have.contain',version.COPYRIGHT);
    });
})
