/**
 * Schema definition object for images collection.
 *
 * @name images_form_schema
 * @constant {Object}
 * @memberOf Pages:images
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
        field: "image",
        fieldType: "fileGridFS",
        optional: true,
        adjustLabel: true,

        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: documents.SIZE_GRID_IMAGE,
            coll: "images",
            location: "recipes",

            //* include croppie setup
            croppie: {
                viewport: {width: documents.SIZE_CROPPIE_WIDTH, height: 'auto', type: 'square'},
                enableResize: true
            },
        },
        defaultValue: {name: "", src: ""},
    }
];
