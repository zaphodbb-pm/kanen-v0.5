/**
 * Text for Template page.
 *
 * @name template_text
 * @constant {Object}
 * @memberOf Pages:template
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components, list, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Template Page",
        subtitle:   "Stock Starter Page Template",
        body:   "Add, subtract or change items to meet your needs.",
    }
};


export const page = {
    page: {
        en: {
            examples: "Examples",

            files: "Structural Page Files",
            thead: ["File Name", "Locus", "Exports", "Description"],

            preamble: "<p>Each unique page has its own directory and can be added or removed as needed.  " +
                "Each Page is stand-alone and is controlled by 5 main files and one optional one.</p>" +
                "<p>A Functions directory is also provided.  Generally, all logic should be abstracted to Functions outside " +
                "the Page.  This allows for more rigorous testing of these Functions and makes the Page simpler.  " +
                "Page testing is performed by Cypress based test files.  Both Functions and page testing files are in the " +
                "associated 'test' directory that is unique to each page.</p>",

            _nav: {
                name: "template_nav.js",
                locus: "Client, Server",
                desc: "Per Page navigation and text information.  " +
                    "Roles are used by server to control access to collections.  " +
                    "Roles are also used on the client to allow or suppress Page navigation link and Page rendering."
            },

            _text: {
                name: "template_text.js",
                locus: "Client",
                desc: "All text should be abstracted from Components.  This then supports language switching based on user preferences."
            },

            _loader: {
                name: "template_loader.svelte",
                locus: "Client",
                desc: "Used by router to dynamically load svelte page into the main Page wrapper.  Note that only static file names " +
                    "are supported by 'import', hence each Page needs its own unique loader."
            },

            _route: {
                name: "template_route.js",
                locus: "Client",
                desc: "Configuration object for 'svelte-pathfinder' npm module.  Builds unique Page to be rendered into the parent 'App'.  " +
                    "Uses output from 'template_loader.svelte' and 'template_nav.js'."
            },

            _svelte: {
                name: "template.svelte",
                locus: "Client",
                desc: "Page layout that will be rendered by the router.  This is the place that all the interesting things " +
                    "(that you can dream up) will happen.  Uses 'template_text.js' and optional 'template_config.js' files " +
                    "to hydrate the Page and Components with static language controlled information."
            },

            _config: {
                name: "template_config.js",
                locus: "Client",
                desc: "Optional configuration file for Components embedded in a Page.  " +
                    "These would typically be widgets such accordions, progress bars, info boxes, etc.  " +
                    "CSS classes, data points and other items would be set here.  Note that any text would be contained " +
                    "in the 'template_text.js' file"
            },

            _functions: {
                name: "/Functions/*",
                locus: "Client",
                desc: "These Functions are Page specific only.  General Functions are handled in different directories."
            },

            _tests: {
                name: "/tests/cypress/* <br/> /tests/Functions/*",
                locus: "Client",
                desc: "Function testing is handled by Mocha.  Page testing is handled by Cypress.  " +
                    "Component testing is handled by a special Mocha jig and uses 'jsdom'."
            },

            props: "Component Properties",

            propsDesc: "Each rendered Page gets passed 'currentRoute' and 'params', from the router.  " +
                "'currentRoute' contains information about the current route and the child routes.  " +
                "'params' allows you to send any additional params to the rendered component.  " +
                "This is useful if you add any logic in your template, to check user's permission for instance, and want to " +
                "send extra info to the rendered component.  " +
                "The config file provides static set-up information for some Components. ",

            route: "currentRoute",
            params: "params",
            query: "query",
            config: "Config File"
        }
    },

    components: {

        box: {
            en: {
                msg: "The <em>time</em> has come to <u>speak</u> of many things ..."
            }
        },

        widget: {
            en: {
                title: "Title"
            }
        }
    },

    //** example for list / form Components
    list: {
        en: {
            name: "Name"
        }
    },

    form: {
        en: {
            name: "Name"
        }
    }
};
