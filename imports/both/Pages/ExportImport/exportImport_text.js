/**
 * Text for ExportImport page.
 *
 * @name exportImport_text
 * @constant {Object}
 * @memberOf Pages:exportImport
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Export / Import Page",
        lead:   "Admin controls exporting CSV files.",
        body:   "",
    }
};


export const page = {

    components: {
        en: {
            card: {
                title: "Export / Import Documents to a Collection",
                description: "Select the collection to use first!  You can then export this collection or " +
                    "import is available to find a file and load it into the database.",

                btnSend: "Export",
                btnReceive: "Import",

                msgFind: "Finding document ...",
                msgBuild: "Building ... ",
                msgDone: "Process finished",
                msgNoColl: "No valid collection selected",
                msgError: "Select collection or / and input file. ",
                msgExportFail: "No content found to export.",
                msgImportFail: "Server was unable to process import records.",
            }
        }
    },

    form: {
        en: {

            collections: {
                label: "Select Collection",
                helpText: "",
                tag: {_id: "none", name: "Select Collection"},
                selects: [
                    {_id: 'none', name: "Select One ..."},
                    {_id: 'learn', name: "Learn"},
                    {_id: 'starter', name: "Starter"},
                    {_id: 'notifications', name: "Notifications"},

                    {_id: 'sysConfig', name: "System Config"},
                    {_id: 'logsSystem', name: "System Logs"},
                    {_id: 'LogsUsers', name: "User Logs"},
                    {_id: 'users', name: "Users"},
                ]
            },

            fileInput: {
                label: "Upload JSON File",
                helpText: "",
            },
        }
    },

};
