/**
 * Schema definition object for CookingNow collection.
 *
 * @name cookingNow_form_schema
 * @constant {Object}
 * @memberOf Pages:cookingNow
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          cookingNowId =          String: FCnnn-CN_ss
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
 *          writer =                String: author
 *
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
import {documents} from "../../systemGlobals";


export default [

    {
        field: "cookingNowId",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "FC000_CN_00",
    },

    {
        field: "issue",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "FC000 Jan/Feb 1994 page: 00",
    },

    {
        field: "name",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 64},
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
        fieldType: "fileGridFS",
        optional: true,
        adjustLabel: true,

        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: documents.SIZE_GRID_IMAGE,
            coll: "images",
            location: "cookNow",

            //* include croppie setup
            croppie: {
                viewport: {width: documents.SIZE_CROPPIE_WIDTH, height: 'auto', type: 'square'},
                enableResize: true
            },
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "body",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 5000, rows: 9},
        params: {},
        defaultValue: "",
    }
];
