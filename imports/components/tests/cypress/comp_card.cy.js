/**
 * Component test for card using Cypress.io.
 *
 * @notes
 *  1. Install cypress at project root:  meteor npm install cypress --save-dev
 *  2. Config cypress.json to start at "tests" directory
 *  3. Run cypress in console at project root: npx cypress open
 */

import Card from "/imports/components/blocks/card.svelte";

console.log("Card", Card);


import { mount } from 'cypress-svelte-unit-test'

console.log("mount", mount);




const compName = "card";

describe(`Component: ${compName} exists`, () => {

    it(`Get ${compName}`, () => {
        mount(Card, {});

        console.log("mounted");
    });
})
