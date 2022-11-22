/**
 * Configuration for ExportImport Components (optional).
 *
 * @memberOf Pages:exportImport
 * @function exportImport_config
 * @locus Client
 *
 * @property {Object} pageConfig - {components}
 */

export const pageConfig =  {

    components: {
        collections: {
            field: "collections",
            fieldType: "select",
            optional: true,

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
