/**
 * Configuration for Learn Components (optional).
 *
 * @name learn_config
 * @constant {Object}
 * @memberOf Pages:learn
 * @locus Client
 *
 * @property {Object} pageConfig - {components}
 */

export const pageConfig =  {

    components: {
        getLang: {
            field: "getLang",
            fieldType: "select",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {type: "staticSelect"},
            defaultValue: {_id: "all", name: "All Options"},
        },

        readMode: {
            field: "readMode",
            fieldType: "switch",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {},
            defaultValue: true,
        },
    }
};
