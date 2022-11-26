/**
 * Text for Documentation Page.
 *
 * @name documentation_text
 * @constant {Object}
 * @memberOf Pages:documentation
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Software Documentation",
        subtitle:   "List of all software pages, routines and Components.",
        body:   ""
    }
};


export const page = {

    page: {
        en: {
            howToUse: '"Build Jsdoc" button scans /imports and /client directories for .svelte files and extracts the Jsdoc portion ' +
                    'and builds the [filename].jsdoc file that can be picked up by Jsdoc. <br /><br /> ' +
                    'Second step is to run jsdoc to build all of the appropriate files.<br /><br />' +
                    '"Get Documentation" forces the server to find the raw Jsdoc file and format for display.',

            setup: "<p>We use automated JSDoc generation for Meteor projects in the form of the standard " +
                "<a href='http://usejsdoc.org/'>jsdoc</a>.  Svelte components are handled by the add-on " +
                "<a href='https://github.com/alexprey/sveltedoc-parser'>sveltedoc-parser</a>.  " +

                '<p>Generating documentation is a three step process as shown at right.  ' +
                '"Build Jsdoc" button scans /imports and /client directories for .svelte files and extracts the Jsdoc portion ' +
                '"Get Documentation" forces the server to find the raw Jsdoc file and format for display.  ' +
                '</p>',

            btnJsdoc: "Build Jsdoc",

            btnGetDocs: "Get Documentation",

            notSupported: "Documentation is not supported for this environment.",

            step1: "Create [filename].jsdoc files from [filename].js and [componentname].svelte by scanning and " +
                "retrieveing the jsdoc formatted comments.",

            step2: "<p>From the root of your code directory, run jsdoc as: </p>" +
                "<p><pre><code>jsdoc ./ -r -c jsdoc-conf.json -X > ./private/raw-documentation.json</code></pre></p>" +
                "<p>This collects the generated [filename].jsdoc files and aggregates them into raw-documentation.json file " +
                "and sends it into the private folder.</p>",

            step3: "Generated formatted documentation from the raw file into documentation.json.  Then remove all of the " +
                "[filename].jsdoc files from the project.",
        }
    },




    components: {

        btnJsdoc: {
            en: "Build Jsdoc"
        },

        btnGetDocs: {
            en: "Get Documentation"
        },

        documentation: {
            en: {
                notSupported: "Documentation is not supported for this environment.",

                setup: "<p>We use automated JSDoc generation for Meteor projects in the form of the standard " +
                    "<a href='http://usejsdoc.org/'>jsdoc</a>.  Svelte components are handled by the add-on " +
                    "<a href='https://github.com/alexprey/sveltedoc-parser'>sveltedoc-parser</a>.  " +

                    "<p>Generating documenttation is a three step process as shown at right</p>",

                step1: "Create [filename].jsdoc files from [filename].js and [componentname].svelte by scanning and " +
                    "retrieveing the jsdoc formatted comments.",

                step2: "From the root of your code directory, run jsdoc as: " +
                    "<pre><code>jsdoc ./ -r -c jsdoc-conf.json -X > ./private/raw-documentation.json</code></pre>.  " +
                    "This collects the generated [filename].jsdoc files and aggregates them into raw-documentation.json file " +
                    "and sends it into the private folder.</p>",

                step3: "Generated formatted documentation from the raw file into documentation.json.  Then remove all of the " +
                    "[filename].jsdoc files from the project.",
            }
        },
    }
};

