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


const url = window.location.href;





export const page = {

    page: {
        en: {
            tabs: ["Text", "Config", "Payload"],

            reportsTitle:"Report Widget",

            reports: "These widgets can be used to report key performance states.<br><br>  " +
                "Progress bar is optional and set by 'isProgress switch to true in config file.  " +
                "Low and high thresholds can also be set to change colour between 'success', 'warning' or 'danger'.  " +
                "Title and value prefix are set in the '*_text.js' file.<br><br>  " +
                "Data values are set in the payload object.",

            infoTitle:"Information Widget",
            info: "These widgets can typically be used to display important numbers that need to be tracked.<br><br>  " +
                "Colours can also be set to change colour between 'primary', 'secondary' or 'tertiary'.  " +
                "An optional footer with text and url is also available." +
                "Title, value thousands separator with prefix or suffix are set in the '*_text.js' file.<br><br>  " +
                "Data values are set in the payload object.",

            gaugesTitle:"Gauge Widget",
            gauges: "The gauge widgets are typically used to display useful single number values in relation to an overall range.<br><br>  " +
                "The gauge can be structured as 'donut', 'ring' or 'meter'.  " +
                "Colours can also be set to change colour between 'primary', 'secondary' or 'tertiary'.  " +
                "A relative or absolute value can be displayed.  If the value is relative, then low and high threshold settings with use " +
                "'success, 'warning' or 'danger' colours will override<br><br>." +
                "Title and suffix are set in the '*_text.js' file.<br><br>  " +
                "A single data value is set in the payload object.",

            chartsTitle:"Chart Widget",
            charts: "The charts are typically used to display time series or data series that you want to compare .<br><br>  " +
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
        }
    }
};
