/**
 * Schema definition object for Editions collection.
 *
 * @name editions_form_schema
 * @constant {Object}
 * @memberOf Pages:editions
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          editionId =             String: FCyyyy
 *          issue =                 String: edition issue as "2020_holidays"
 *
 *          image =                 Object: encoded image data
 *          pdfLink =               String: long url to facebook group google drive
 *          zinioLink =             String: long link url to finecooking.zinioapps.com
 *          archiveLink =           String: long url to archive.org
 *
 *
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
        field: "editionId",
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
            resizeWidth: 256,
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



    /* have up to 10 groups of lists of recipes */
    {
        field: "hr1",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName1",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList1",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr2",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName2",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList2",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr3",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName3",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList3",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr4",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName4",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList4",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr5",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName5",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList5",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr6",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName6",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList6",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },


    {
        field: "hr7",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName7",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList7",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },



    {
        field: "hr8",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName8",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList8",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },



    {
        field: "hr9",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName9",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList9",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    },



    {
        field: "hr10",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "groupName10",
        fieldType: "input",

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupList10",
        fieldType: "itemList",

        attributes: {maxlength: 128, rows: 1},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    }
];
