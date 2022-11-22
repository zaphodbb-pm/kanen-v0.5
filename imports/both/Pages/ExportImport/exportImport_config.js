/**
 * Configuration for ExportImport Components (optional).
 *
 * @name exportImport_config
 * @constant {Object}
 * @memberOf Pages:exportImport
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
