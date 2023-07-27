/**
 * Schema definition object for thumbnails collection.
 *
 * @name thumbnails_form_schema
 * @constant {Object}
 * @memberOf Pages:thumbnails
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * One record per subscriber
 * Schema items
 *          name =                  String: name of file
 *          type =                  String: image type
 *          size =                  Number: size of base64 encoded image in bytes
 *          link =                  String: url to image data
 *          image =                 Object: {name, src} url to image data
 *
 */


import {documents} from "../../systemGlobals";

export default [

    {
        field: "name",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 128},
        params: {},
        defaultValue: "",
    },

    {
        field: "type",
        fieldType: "input",
        optional: true,
        group: {section: 0, class: ""},

        attributes: {type: "text", maxlength: 128},
        params: {},
        defaultValue: "",
    },

    {
        field: "size",
        fieldType: "input",
        optional: true,
        group: {section: 0, class: ""},

        attributes: {type: "text", maxlength: 128},
        params: {},
        defaultValue: "",
    },

    {
        field: "link",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 256},
        params: {},
        defaultValue: "",
    },

    {
        field: "location",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 256},
        params: {},
        defaultValue: "",
    },

    {
        field: "thumbnail",
        fieldType: "fileGridFS",
        optional: true,
        adjustLabel: true,

        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: documents.SIZE_GRID_THUMBNAIL,
            coll: "thumbnails",
            location: "recipes",
        },
        defaultValue: {name: "", src: ""},
    }
];
