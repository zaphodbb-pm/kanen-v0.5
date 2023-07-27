/**
 * Schema definition object for TestKitchen collection.
 *
 * @name testKitchen_form_schema
 * @constant {Object}
 * @memberOf Pages:testKitchen
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          testKitchenId =         String: FCnnn-TK_ss
 *          type =                  Object: {id, name} one of [“technique”, “food science”, “tips”, “recipe”, “ingredients”, “equipment”, “glossary”, “tools”, “history”]
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
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
        field: "testKitchenId",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "FC000_TK_00",
    },

    {
        field: "type",
        fieldType: "radios",
        optional: true,

        attributes: {},
        params: {cols: 3},
        defaultValue: {_id: "main", name: "Main"},
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

        attributes: {type: "text", maxlength: 128},
        params: {actions: "capitalize"},
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
            location: "testKitchen",

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
        fieldType: "editor",
        tab: 3,
        attributes: {maxlength: 500000},
        params: {},

        optional: true,
        defaultValue: "",
    }
];
