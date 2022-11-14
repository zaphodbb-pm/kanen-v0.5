/**
 * @summary Labels for Home page.
 *
 * @memberOf Pages:home
 * @function home_text
 * @locus Client
 *
 * @exports {Object} - {header}
 * @exports {Object} - {page}
 */



//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Kanen - A Seedling Starter Package",
        subtitle:   "",
        body:   "",
    }
};


export const page = {

    page: {
        en: {
            overview: "Overview",

            intro: "<p><b>Kanen</b> is built on the most current technologies and using the latest releases of Meteor, MongoDb, Svelte and " +
                "<a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/home.html' target='_blank'>Goldilocks-CSS</a>.  " +
                "It is also an opinionated view of the work that needs to get done.  </p>" +
                "<p>This package is clearly not for everyone nor does it try to accommodate the latest new shiny ideas.  " +
                "This package is meant for business people / product managers that need to get outcomes quickly with applications " +
                "that can scale during the initial growth phase of a company.</p>" +
                "<p><b>Kanen</b> comes from the Mohawk language and means 'seed'.  " +
                "The Mohawk people are indigenous to the St. Lawrence River Valley from Quebec City to upstate New York.  " +
                "The seed ceremony is very important in the Mohawk culture as it represents a renewal in spring " +
                "and prepares for growing food and nourishing the community.  </p>" +
                "<p>We believe that <b>Kanen</b> reflects what we are trying to accomplish with this package.</p>",

            details: "Project Details",

            quote: "Life is really simple, but we insist on making it complicated. <br>" +
                    "Study the past if you would define the future. ",

            cite: "Confucius, <cite><a href='https://www.thoughtco.com/best-confucius-quotes-2833291'>Thoughtco.com</a></cite>",

            philosophy: {
                title: "Philosophy",

                body: [
                    "Adherence to Standards",
                    "Configuration rather than programming",
                    "Appropriate componentization for easier maintenance",
                    "Keep it light weight, remove anything that is not needed",
                    "Make it fast to load and execute."
                ]
            },

            features: {
                title: "Features",

                body: [
                    [
                    "Minimal Meteor add-on packages to reduce bundle size.",
                    "Uses Meteor methods for database read / store for greater speed.",
                    "Leverages MongoDb Change Streams for real time tracking.",
                    "Set up to be a Progressive Web App"
                        ],

                    [
                    "Each page is self contained. Can be removed or added by editing route table.",
                    "Leverages Svelte-loadable to minimize initial app load.",
                    "Uses Svelte stores for state management.",
                    "Uses Svelte context for text and other static information.",
                    "All text is abstracted on a per page basis to allow for internationalization and easy maintenance."
                        ],

                    [
                    "Includes a variety of widgets / components for content display or dashboard indicators.",
                    "Includes a mini-wiki to provide user learning resources.",
                    "Built-in form builder with 16 configurable field types. Supports tabbed sections and horizontal grouped fields.",
                    "Built-in document lister with filter plugins and compound search. Supports table or grid layouts."
                        ],

                    [
                    "Supports built-in user roles and groups for access control.",
                    "Includes System Config file for dynamic application control and debug reporting.",
                    "Logs system and user activity."
                        ]
                ]
            },

            packages: {
                title: "Main Packages",

                body: [
                    "Meteor 2.8.0",
                    "MongoDB 5.0.5",
                    "<a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/home.html' target='_blank'>Goldilocks-CSS 0.2.0</a>",
                    "Svelte 3.52",
                    "Svelte-loadable 2.0.1 to reduce initial bundle size.",
                    "svelte-pathfinder 3.4.0 router",
                    "Uses selected Feathers svg icons in CSS background to minimize bundle size",
                    "Supports Lineawesome formatted svg files in CSS background.",
                    "Compressed Javascript size is 126 KB on initial page load.",
                    "Compressed CSS (with icons) is 26 KB."
                ]
            },

            explore: "Explore Pages",
        }
    },

    components: {

        tabbed: {
            en: [
                {
                    icon: "icon-bg-tag",
                    label: "General",
                    lead: "Pages that are generally accessible by unlogged in users.",
                    text: [
                        "<a href='/home'>Home</a> - this page.",

                        "<a href='/template'>Template</a> - very basic page to be copied and modified to its intended use.",

                        "<a href='/icons'>Icons</a> - list of all Lineawesome icons used in this application.  " +
                        "Includes examples of various sizes and system colours.",

                        "<a href='/colours'>Colours</a> - display of all system colour constants.",

                        "<a href='/learn'>Learn</a> - mini-wiki that provides content to help a client to use your application.",
                    ]
                },

                {
                    icon: "icon-bg-grid",
                    label: "Components",
                    lead: "Special purpose pages that typically are only available to valid and logged in users.",
                    text: [
                        "<a href='/cards'>Cards</a> - basic examples of card component.",

                        "<a href='/content-widgets'>Tab AdminPanel</a> - example of tabbed and accordion components.",

                        "<a href='/widgets'>AdminPanel</a> - a variety of dashboard like display widgets.",

                        "<a href='/listForm'>Starter ListForm</a> - list display and form builder example. " +
                        "Form includes all of the various field types and configurations.",

                        "<a href='/login'>Login</a> - for a user that wants to login with an email / password or " +
                        "any third party service.",
                    ]

                },

                {
                    icon: "icon-bg-user-plus",
                    label: "User",
                    lead: "User pages for only logged in or logging in users.  " +
                        "Use email: 'test-user@example.com' with password: 'test-user-kanen' to see these pages. ",

                    text: [
                        "<a href='/my-profile'>My Profile</a> - only seen by a logged in user.  " +
                        "Allows for the addition of extra user information into a 'profile' field.",

                        "<a href='/changePassword'>Change Password</a> - only available to a logged in user. " +
                        "Typical change password form",

                        "<a href='/pubSub'>Pub Sub</a> - example of connecting to MongoDB and using <em>Change Streams</em> " +
                        "to reactively respond to chnages in a collection.",
                    ]
                },

                {
                    icon: "icon-bg-edit",
                    label: "Content Control",
                    lead: "Pages only available to system admin for general maintenance.",
                    text: [
                        "<a href='/buildContent'>Build Content</a> - list / form to enter content into the mini-wiki.  " +
                        "This privilege is reserved for system admins only.",

                        "<a href='/documentation'>Jsdoc</a> - Jsdoc style documentation for all of the executable files in this application.  " +
                        "This is for development purposes to aid a programmer in building more functionality.",

                        "<a href='/logsSystem'>System Logs</a> - a variety of dashboard like display widgets.",

                        "<a href='/logsUsers'>User Logs</a> - a variety of dashboard like display widgets.",
                    ]
                },

                {
                    icon: "icon-bg-lock",
                    label: "Admin Only",
                    lead: "Pages only available to system super admin role.",
                    text: [
                        "<a href='/users'>Users</a> - list and form to set up user information and role / group access.",

                        "<a href='/sysConfig'>System Config</a> - list and form to control certain system wide configuration options.",

                        "<a href='/exportImport'>Export Import</a> - administration to send a JSON formatted collection file to a user " +
                        "computer.  User can also upload a JSON file to a collection.",
                    ]
                },
            ]
        }
    }
};
