/**
 * Schema definition object for Recipes collection.
 *
 * @name recipes_form_schema
 * @constant {Object}
 * @memberOf Pages:recipes
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          recipeId =              String: issue_nnn-ART_ss
 *          type =                  Object: {id, name} one of "main", "makeItTonight", "moveableFeast"
 *          articleId =             String: pointer to article that references this recipe or leave blank
 *          issue =                 String: "FC000 Jan/Feb 1994 page: 00"
 *
 *          name =                  String: name of this document
 *          subTitle =              String: text
 *          commentary =            String: text
 *          writer =                String: name of author
 *          attribution =           String: list of contributors
 *
 *          serves =                Number: number of people this recipe serves
 *          image =                 Object: url to image
 *          thumbnail =             Object: url to thumbnail
 *
 *          ingredients =           String: html body text with ingredients list
 *          instructions =          String: html body text with list of instructions
 *          pairWith =              String: text commentary
 *
 *          cookingMethod =         Object: {id, name} one of 23 (uses static typeahead)
 *          course =                Object: {id, name} one of 9
 *          cuisine =               Object: {id, name} one of 34 (uses static typeahead)
 *          dish =                  Object: {id, name} one of 35 (uses static typeahead)
 *          mainIngredient =        Object: {id, name} one of 18 (uses static typeahead)
 *          specialConsideration  = Object: {id, name} one of 11
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
        field: "recipeId",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "FC000_REC_00",
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
        field: "articleId",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 32},
        params: {},
        //defaultValue: "FC000_ART_00",
        defaultValue: "",
    },

    {
        field: "issue",
        fieldType: "input",
        optional: false,

        attributes: {type: "text", maxlength: 64},
        params: {},
        //defaultValue: "FC000 Jan/Feb 1994 page: 00",
        defaultValue: "",
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
        field: "commentary",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 5000, rows: 4},
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
        field: "serves",
        fieldType: "input",
        optional: true,

        attributes: {type: "number"},
        params: {},
        defaultValue: 4,
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

            //* include croppie setup
            croppie: {
                viewport: {width: documents.SIZE_CROPPIE_WIDTH, height: 'auto', type: 'square'},
                enableResize: true
            },
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "ingredients",
        fieldType: "editor",
        attributes: {maxlength: 500000},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "instructions",
        fieldType: "editor",
        attributes: {maxlength: 500000},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "pairWith",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 2000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "cookingMethod",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 15},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "course",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 15},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "cuisine",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 15},
        defaultValue: {_id: "", name: ""},
    },

    /*

    {
        field: "dish",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 12},
        defaultValue: {_id: "", name: ""},
    },

     */

    {
        field: "mainIngredient",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 15},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "specialConsideration",
        fieldType: "typeahead",
        optional: true,

        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 15},
        defaultValue: {_id: "", name: ""},
    }
];
