/**
 * @summary Labels for AdminPanel.
 *
 * @memberOf Pages:adminPanel
 * @function adminPanel_text
 * @locus Client
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Admin Panel",
        lead:   "An example of a variety of information and report boxes and their config objects.",
        body:   null //"Supporting text for header",
    }
};


export const page = {

    page: {
        en: {
            reportsTitle:"Report Widget",
            reports: "Report key performance",

            infoTitle:"Information Widget",
            info: "Information Widgets",

            gaugesTitle:"Gauge Widget",
            gauges: "Gauge Widget",

            chartsTitle:"Chart Widget",
            charts: "Chart Widget"
        }
    },

    widgets: {
        en: {
            reportbox1: {
                title: "Report One",
                srCaption: "Report Box One Info",
                valPrefix: "$",
            },

            reportbox2: {
                title: "Report Two",
                srCaption: "Report Box Two Info",
                progLabel: "progress",
                valSuffix: "€",
            }
        }
    }


    /*
    components: {
        infobox: {
            en: {
                title: "Complex Box",
                barText: "Progress",
                prefix: "$",
                suffix: "-sfx"
            }
        },

        infobox2: {
            en: {
                title: "Simple Box",
                barText: "",
                prefix: "",
                suffix: ""
            }
        },

        expander1: {
            en: {
                icon: "iconPayload",
                logo: "",
                title: "Payload",
                subTitle: ""
            }
        },

        expander2: {
            en: {
                icon: "iconConfig",
                logo: "",
                title: "Config",
                subTitle: "JSON object format"
            }
        },

        progExample: {
            en: {
                labels: ["One", "Two", "Three"]
            }
        },

        gaugeRing: {
            en: {
                title: "Gauge1",                  // main title for widget
                description: "Circular Ring",     // more detail
            }
        },

        gaugePie: {
            en: {
                title: "Gauge2",                // main title for widget
                description: "Circular Pie",    // more detail
            }
        },

        squarebox: {
            en: {
                suffix: "%",                    // value suffix
                title: "Dog Walkers",           // slug line
            }
        },

        bigInfobox: {
            en: {
                prefix: "$",
                title: "Economics",             // slug line
                suffix: "%",                    // value suffix
                link: "http://www.apple.com",   // info link only (optional)
                linkText: "More Info",          // info link text only (optional)
            }
        },

        list: {
            name: {en: "Name"}
        },

        form: {
            name: {en: "Name"}
        },
    }

     */
};
