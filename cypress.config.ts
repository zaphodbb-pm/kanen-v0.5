import { defineConfig } from "cypress";

export default defineConfig({
    downloadsFolder: "tests/cypress/downloads",
    fixturesFolder: "tests/cypress/fixtures",
    screenshotsFolder: "tests/cypress/screenshots",
    videosFolder: "tests/cypress/videos",

    e2e: {
        baseUrl: 'http://localhost:3000',
        supportFile: "tests/cypress/support/e2e.ts",
        specPattern: "imports/**/tests/e2e/*.cy.js",

        setupNodeEvents(on, config) {
          // implement node event listeners here
        },
    },
});
