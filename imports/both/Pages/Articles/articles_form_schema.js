/**
 * Schema definition object for Articles collection.
 *
 * @name articles_form_schema
 * @constant {Object}
 * @memberOf Pages:articles
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          articleId =             String: FCnnn-ART_ss
 *          type =                  Object: {id, name} one of "main", "howTo", "ingredient", "makeYourOwn"
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
 *          subTitle =              String: text
 *          writer =                String: content author
 *          attribution =           String: list of contributors
 *
 *          image =                 Object: encoded image data
 *          body =                  String: html body text with any images (editable)
 *
 *          recipes =               Array: [strings of recipeIds]
 *
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
        field: "articleId",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "FC000_ART_00",
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
        field: "subTitle",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 256, rows: 2},
        params: {},
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
        field: "attribution",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 256, rows: 2},
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
            location: "articles",

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
    },

    {
        field: "recipes",
        fieldType: "itemList",
        attributes: {maxlength: 64, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [{id: 1, text: '...'}],
    },
];
