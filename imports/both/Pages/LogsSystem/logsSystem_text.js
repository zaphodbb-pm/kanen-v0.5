/**
 * @summary Labels for LogsSystem page.
 *
 * @name logsSystem_text
 * @constant {Object}
 * @memberOf Pages:logsSystem
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {element, list}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "LogsSystem Page",
        lead:   "Adjust certain system parameters on the fly.",
        body:   "",
    }
};


export const page = {

    element: {
        en: {
            label: "Delete a range of records from system logs.",

            selects: [
                {_id: "none", name: "None"},
                {_id: "days_1", name: "From Yesterday"},
                {_id: "days_7", name: "From Last Week"},
                {_id: "days_30", name: "From Last Month"},
                {_id: "days_90", name: "From last Quarter"},
                {_id: "days_365", name: "From Last Year"},
                {_id: "all", name: "All Times"},
            ]
        }
    },

    list: {
        en: {
            labels: {
                hdr: "List of System Logs",
                addNew: ""
            },

            tag: {
                label: "Tag",
            },

            timeStamp: {
                label: "Time Stamp",
                filter: {
                    placeholder: "Date Range",
                }
            },

            data: {
                label: "Data",
            },

            _id: {
                label: "Del",
            }
        }
    }
};
