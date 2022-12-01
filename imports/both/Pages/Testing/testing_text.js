/**
 * Text for Testing page.
 *
 * @name testing_text
 * @constant {Object}
 * @memberOf Pages:testing
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components, list, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Testing Page",
        subtitle:   "Basic Testing",
        body:   "",
    }
};


export const page = {
    page: {
        en: {
            heading1: "Preamble",

            preamble: "<p>Following standards simplifies set-up and maintenance whilst also ensuring long term project maintainability.  " +
                "Adhering to W3C standards (HTML and CSS), Javascript , etc helps with project longevity.  Being thoughtful about the " +
                "addition of third party modules helps with long term maintainability and minimizes the impact of abandoned code.</p>" +
                "<p>Keeping this in mind, we follow the standard Meteor way to test an application.  Considering the many recent changes to Meteor, " +
                "this documentation has been slow to keep up to date.  In particular, the information on testing seems to be in need of a major " +
                "clean-up as it does not accurately reflect how to use the testing tools build into Meteor.  We have had to use trial and error " +
                "to get testing set-up.  Below are our notes and observations. </p>",

            heading11: "Structure",

            items1: [
                "Testing has been set up to follow the <a href='https://guide.meteor.com/testing.html'>meteor guidelines</a> as well as " +
                "utilizing the " +
                "<a href='https://svelte-tutorial.meteor.com/simple-todos/11-testing.html'>procedures for testing svelte components</a>.",

                "Unit test is done using basic meteor test set-up.  This can be run in the console by using: <br><br>" +
                "<pre><code>meteor test --driver-package meteortesting:mocha --settings settings-dev.json</code></pre>  <br>" +
                "Note that the client test results can be seen in the browser.",

                "Integration test using test set-up with <code>--full-app</code> and can be run in the console by using: <br><br>" +
                "<pre><code>meteor test --full-app --driver-package meteortesting:mocha --settings settings-dev.json</code></pre>  <br>" +
                "Note that the client test results can be seen in the browser.",

                "The <code>chai</code> assertion library is added to <code>node_modules</code> and can be used to provide a variety " +
                "of approaches to test structures."
            ],

            heading12: "Lessons Learned",

            items2: [
                "In <code>package.json</code> file, remove <code>testModule: \"tests/main.js\"</code>.  This forces the test version of Meteor to use " +
                "our own main test files that are eagerly loaded during start up.",

                "<strong>Any</strong> files in <strong>any</strong> <code>tests</code> directory will <strong>not</strong> be loaded by the test runner.  " +
                "These files must be imported into the main test files.",

                "Any <code>*.test.js</code> outside of the <code>tests</code> directory will be eagerly loaded for the basic unit tests.  " +
                "There should only be one for server testing and one for client testing.  These files should then import the individual " +
                "test files from their associated <code>tests</code> directories.",

                "For full application testing, any <code>*.app-test.js</code> outside of the <code>tests</code> directory will be eagerly " +
                "loaded for the integration tests.  " +
                "There should only be one for server testing and one for client testing.  These files should then import the individual " +
                "integration test files from their associated <code>tests</code> directories.",
            ],

            heading2: "Examples"
        }
    }
};
