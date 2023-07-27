/**
 * Schema definition object for NewsSearch collection.
 *
 * @name newsSearch_form_schema
 * @constant {Object}
 * @memberOf Pages:newsSearch
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =                  String: issue_nnn
 *          image =                 Object: encoded image data
 *          body =                  String: html body text with any images (editable)
 *
 *      Automatically added by system during submit phase:
 *          author =                String: unique user id
 *          authorName =            String: author name or username
 *          authorFullName =        String: First Name + Last Name from user profile
 *          sortName =              String: document name in lower case to make sorting case independent
 *          tenantId =              String: user tenantId when in multi-tenant mode
 *          updatedAt =             Number: epoch timestamp
 *          createdAt =             Number: epoch timestamp
 *
 */



export default [

    {
        field: "name",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "image",
        fieldType: "fileInput",
        optional: true,

        adjustLabel: true,

        attributes: {},
        params: {
            format: "image",
            type: ["image.*"],

            //* include croppie setup
            croppie: {
                viewport: {width: 'auto', height: 300, type: 'square'},
                enableResize: true
            },
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "body",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 5000, rows: 3},
        params: {},
        defaultValue: "",
    }
];
