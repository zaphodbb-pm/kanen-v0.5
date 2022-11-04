/**
 * Configuration for ExportImport components (optional).
 *
 * @memberOf Pages:exportImport
 * @function exportImport_config
 * @locus Client
 *
 * @returns {Object}
 */

export const pageConfig =  {

    components: {
        collections: {
            field: "collections",
            fieldType: "select",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {type: "staticSelect"},
            defaultValue: {_id: "", name: ""},
        },

        fileInput: {
            field: "fileInput",
            fieldType: "fileInput",
            optional: true,
            adjustLabel: true,

            attributes: {},
            params: {format: "text", type: ["json"]},
            defaultValue: {name: "", src: ""},
        }
    },
};
