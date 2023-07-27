/**
 * Schema definition object for Magazines collection.
 *
 * @name magazines_form_schema
 * @constant {Object}
 * @memberOf Pages:magazines
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          magazineId =            String: FCnnn
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994"
 *
 *          image =                 Object: encoded image data
 *          pdfLink =               String: long url to facebook group google drive
 *          zinioLink =             String: long link url to finecooking.zinioapps.com
 *          archiveLink =           String: long url to archive.org
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
        field: "magazineId",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "FC000",
    },

    {
        field: "issue",
        fieldType: "input",
        optional: true,

        attributes: {type: "text"},
        params: {},
        defaultValue: "FC000 Jan/Feb 1994",
    },

    {
        field: "image",
        fieldType: "fileGridFS",
        optional: true,
        adjustLabel: true,

        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: 400,
            coll: "images",
            location: "recipes",

            //* include croppie setup
            croppie: {
                viewport: {width: documents.SIZE_CROPPIE_WIDTH, height: 'auto', type: 'square'},
                enableResize: true
            },
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "systemPDF",
        fieldType: "input",
        optional: true,

        attributes: {maxlength: 256},
        params: {},
        defaultValue: "",
    },

    {
        field: "pdfLink",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 256, rows: 2},
        params: {},
        defaultValue: "",
    },

    {
        field: "zinioLink",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 256, rows: 2},
        params: {},
        defaultValue: "",
    },

    {
        field: "archiveLink",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 256, rows: 2},
        params: {},
        defaultValue: "",
    },
];
