/**
 * Schema definition object for Books collection.
 *
 * @name books_form_schema
 * @constant {Object}
 * @memberOf Pages:books
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          issue =                 String: magazine issue as "FC000"
 *
 *          name =                  String: book title
 *          subtitle =              String: book sub-title
 *          writer =                String: author of book
 *
 *          image =                 Object: encoded image data
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
import {documents} from "../../systemGlobals";


export default [

    {
        field: "issue",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "FC000",
    },

    {
        field: "name",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 128},
        params: {actions: "capitalize"},
        defaultValue: "",
    },

    {
        field: "subtitle",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 256},
        params: {actions: "capitalize"},
        defaultValue: "",
    },

    {
        field: "writer",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 128},
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
            resizeWidth: documents.SIZE_BROWSE_IMAGE,
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "review",
        fieldType: "editor",
        attributes: {maxlength: 10000},
        params: {},

        optional: true,
        defaultValue: "",
    },
];
