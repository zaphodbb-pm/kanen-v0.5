/**
 * Text for AdminPanel.
 *
 * @name adminPanel_text
 * @memberOf Pages:adminPanel
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components, widgets}
 *
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
            tabs: ["Text", "Config", "Payload"],

            reportsTitle:"Report Widget",

            reports: "These widgets can be used to report key performance states.  " +
                "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/reports.html' target='_blank'>report widgets</a> " +
                "for more details.<br><br>  " +
                "Progress bar is optional and set by 'isProgress switch to true in config file.  " +
                "Low and high thresholds can also be set to change colour between 'success', 'warning' or 'danger'.  " +
                "Title and value prefix are set in the '*_text.js' file.<br><br>  " +
                "Data values are set in the payload object.",

            infoTitle:"Information Widget",
            info: "These widgets can typically be used to display important numbers that need to be tracked.  " +
                "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/infobox.html' target='_blank'>info widgets</a> " +
                "for more details.<br><br>  " +
                "Colours can also be set to change colour between 'primary', 'secondary' or 'tertiary'.  " +
                "An optional footer with text and url is also available." +
                "Title, value thousands separator with prefix or suffix are set in the '*_text.js' file.<br><br>  " +
                "Data values are set in the payload object.",

            gaugesTitle:"Gauge Widget",
            gauges: "The gauge widgets are typically used to display useful single number values in relation to an overall range.  " +
                "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/gauges.html' target='_blank'>gauges</a> " +
                "for more details.<br><br>  " +
                "The gauge can be structured as 'donut', 'ring' or 'meter'.  " +
                "Colours can also be set to change colour between 'primary', 'secondary' or 'tertiary'.  " +
                "A relative or absolute value can be displayed.  If the value is relative, then low and high threshold settings with use " +
                "'success, 'warning' or 'danger' colours will override<br><br>." +
                "Title and suffix are set in the '*_text.js' file.<br><br>  " +
                "A single data value is set in the payload object.",

            chartsTitle:"Chart Widget",
            charts: "The charts are typically used to display time series or data series that you want to compare.  " +
                "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/charts.html' target='_blank'>charts</a> " +
                "for more details.<br><br>  " +
                "The charts can be structured as 'column', 'line', 'pie' or 'donut'. Columns and lines support multiple datasets.<br><br>." +
                "Title and suffix are set in the '*_text.js' file.<br><br>  " +
                "A single data value is set in the payload object."
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
                progLabel: "progress title (optional)",
                progSuffix: "",
                valPrefix: "",
                valSuffix: "€",
            },

            infobox1: {
                title: "Boiling Point",
                srCaption: "Info Box Boiling Point",
                //prefix: "",
                suffix: "ºF",
                //footer: "",
                //url: "",
            },

            infobox2: {
                title: "Repair Cost",
                srCaption: "Info Box Repair Cost",
                prefix: "€",
                separator: ".",
                suffix: "",
                footer: "Buy Deal Now",
                url: "/admin-panel#admin-info-box",
            },

            gauge1: {
                title: "Complete",
                suffix: "%",
            },

            gauge2: {
                title: "Temp",
                suffix: "ºF",
            },

            gauge3: {
                title: "Depth",
                suffix: "µ",
            },

            charts1: {
                caption: "Columns Example",
                labelsColumn: ["Row Labels", "2016", "2017", "2018", "2019", "2020"],
                labelsRow: ["Primary Chart Values"]
            },

            charts2: {
                caption: "Donut Example",
                labelsColumn: ["Row Labels", "Nuts", "Bolts", "Screws", "Nails", "Brads"],
                labelsRow: ["Donut Chart Values"]
            },

            charts3: {
                caption: "Line Example",
                labelsColumn: ["Years", "2017", "2018", "2019", "2020"],
                labelsRow: ["Annual Numbers"]
            },

            charts4: {
                caption: "Multiple Lines Example",
                labelsColumn: ["Quarters", "2017", "2018", "2019", "2020"],
                labelsRow: ["Q1", "Q2", "Q3", "Q4"]
            }
        }
    }
};
