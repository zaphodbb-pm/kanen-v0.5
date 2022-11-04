/**
 * @summary Labels for Colours page.
 *
 * @memberOf Pages:colours
 * @function colours_text
 * @locus Client
 *
 * @returns {Object}
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Colours Page",
        lead:   "Shows the system wide colour constants.",
        body:   "CSS files are built on a triadic colour scheme that can be rotated to any primary colour. <br/>" +
            "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/core-helpers/colours.html'>Colour Palette</a> " +
            "for complete details."
    }
};


export const page = {

    page: {
        en: {
            h2: "System Colours",
        }
    },

    columns: {
        en: {
            main: {
                title: "Main",
                colours: [
                    ["Primary", "is-primary"],
                    ["Secondary", "is-secondary"],
                    ["Tertiary", "is-tertiary"],
                    ["Link", "is-link"],
                    ["Danger", "is-danger"],
                    ["Warning", "is-warning"],
                    ["Success", "is-success"],
                ]
            },

            light: {
                title: "Light Version",
                colours: [
                    ["Primary", "is-primary-light"],
                    ["Secondary", "is-secondary-light"],
                    ["Tertiary", "is-tertiary-light"],
                    ["Link", "is-link-light"],
                    ["Danger", "is-danger-light"],
                    ["Warning", "is-warning-light"],
                    ["Success", "is-success-light"],
                ]
            },

            dark: {
                title: "Dark Version",
                colours: [
                    ["Primary", "is-primary-dark"],
                    ["Secondary", "is-secondary-dark"],
                    ["Tertiary", "is-tertiary-dark"],
                    ["Link", "is-link-dark"],
                    ["Danger", "is-danger-dark"],
                    ["Warning", "is-warning-dark"],
                    ["Success", "is-success-dark"],
                ]
            },

        },
    },
};
