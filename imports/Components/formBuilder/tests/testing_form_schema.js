/**
 * Schema definition object for Starter collection.
 *
 * @name starter_form_schema
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 *
 * Config Object: see /imports/Components/formBuilder/formHolder.svelte for details
 *              field: "startDynamicSelect",        String: field name in database
 *              fieldType: "select",                String: see fieldWrapper notes
 *              optional: true,                     Boolean: if false, forces user entry to present in order to submit form
 *
 *              adjustLabel: true,                  Boolean: (optional) shifts label right to accommodate button add-on
 *              group: {                            Object: (optional) allows formTabFields to create horizontal group of fields
 *                  section: 0,
 *                  class: "is-span-2"
 *              },
 *              tab: 1,                             Number: (optional) displays field in selected form tab set by formTabFields
 *              attributes: {},                     Object: adds attributes to html tags such as 'input'
 *              params: {                           Object: (optional) extra config for complex Components
 *                  type: "dynamicSelect",
 *                  coll: "starter",
 *                  filter: {fields: {name: 1}},
 *                  options: {sort: {name: 1}}
 *              },
 *              defaultValue: {_id: "", name: ""},  {Object|String|Number} submit adds values if no user entry
 *
 *              css: "is-fullwidth",                String: (optional) adds css to fieldWrapper
 *              listen: {src, key, value}           Object: {src: <fieldName>, key: watching object -> <keyName>, value: <trigger value>}
 *              role: ["admin]                      Array: list of user role strings that can see this field
 *
 *
 */


export default [

    //** first tab for basic fields
    {
        // control and decoration for fields in a form
        field: "nameTest",
        fieldType: "input",
        optional: false,

        tab: 0,
        group: null,  //group: {section: 2, class: "is-one-quarter"},

        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "numberTest",
        fieldType: "input",
        optional: true,

        tab: 0,
        group: {section: 0, class: "is-span-1"},

        attributes: {type: "number", min: 9.5, max: 100.5, step: 0.1},
        params: {},
        defaultValue: 11.0,
    },

    {
        field: "integerTest",
        fieldType: "input",
        optional: true,

        tab: 0,
        group: {section: 0, class: "is-span-2"},

        attributes: {type: "number", step: 1, min: 5},
        params: {},
        defaultValue: 7,
    },

    {
        field: "emailTest",
        fieldType: "input",
        optional: true,
        group: {section: 1},
        tab: 0,

        attributes: {type: "email"},
        params: {},
        defaultValue: "",
    },

    {
        field: "phoneTest",
        fieldType: "input",
        optional: true,
        group: {section: 1},
        tab: 0,

        //** src = field to watch;
        //** key = if watched field returns an object, then look at key:value
        //** value = value to trigger on;  allows select box to drive listeners
        listen: {src: "startEmail", key: null, value: ""},

        attributes: {type: "tel"},
        params: {},
        defaultValue: "",
    },

    {
        field: "passwordTest",
        fieldType: "input",
        optional: true,
        tab: 0,

        attributes: {type: "password", autocomplete: "password-main"},
        params: {},
        defaultValue: "",
    },

    {
        field: "textAreaTest",
        fieldType: "textarea",
        optional: true,
        tab: 0,
        attributes: {maxlength: 5000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "addressTest",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "text", maxlength: 128},
        params: {},
        defaultValue: "",
    },


    {
        field: "hr1",
        fieldType: "hr",
        optional: true,
        tab: 0,
    },

    {
        field: "switchTest",
        fieldType: "switch",
        optional: true,

        tab: 0,
        group: {section: 2, class: ""},
        attributes: {},
        params: {},
        defaultValue: false,
    },

    {
        field: "checkItemTest",
        fieldType: "switch",
        optional: true,

        tab: 0,
        group: {section: 2, class: ""},
        attributes: {},
        params: {isCheck: true},
        defaultValue: false,
    },

    {
        field: "checkboxTest",
        fieldType: "checkboxes",
        optional: true,

        tab: 0,
        attributes: {},
        params: {cols: 2, buttons: true},
        css: "is-vertical",
        defaultValue: [],
    },

    {
        field: "radiosTest",
        fieldType: "radios",
        optional: true,

        tab: 0,
        attributes: {},
        params: {cols: 3},
        defaultValue: {_id: "", name: ""},
    },




    //** second tabbed set of fields
    {
        field: "staticSelectTest",
        fieldType: "select",
        optional: true,

        tab: 1,
        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", colours: true},
        defaultValue: {_id: "all", name: "All Options"},
    },

    {
        field: "typeaheadTest",
        fieldType: "typeahead",
        optional: true,

        tab: 1,
        css: "is-fullwidth",
        attributes: {},
        params: {type: "staticSelect", rows: 10},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "timeTest",
        fieldType: "timePicker",
        optional: true,

        tab: 1,

        attributes: {},
        params: {
            hr12: true,
            timeStart: 6,
            timeEnd: 23,
            minuteIncrement: 15
        },
        defaultValue: "",
    },

    {
        field: "dateTimeTest",
        fieldType: "datePicker",
        tab: 1,
        attributes: {maxlength: 10},
        params: {dateFormat: 'Y-m-d', mode: 'single'},

        optional: true,
        defaultValue: "",
    },

    //* third tab set
    {
        field: "apiKeyTest",
        fieldType: "apiKey",
        optional: true,

        tab: 2,
        adjustLabel: true,

        attributes: {},
        params: {length: 24},
        defaultValue: "",
    },

    {
        field: "fileTest",
        fieldType: "fileInput",
        optional: true,

        tab: 2,
        adjustLabel: true,

        attributes: {},
        params: {format: "text", type: ["json", "text.*"]},
        defaultValue: {name: "", src: ""},
    },

    {
        field: "imageTest",
        fieldType: "fileInput",
        optional: true,

        tab: 2,
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
        field: "coloursTest",
        fieldType: "colours",
        optional: true,

        tab: 2,
        attributes: {},
        params: {},
        defaultValue: "#000000",
    },





    //** fourth tabbed set of fields
    {
        field: "editorTest",
        fieldType: "editor",
        tab: 3,
        attributes: {maxlength: 50000},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "listTest",
        fieldType: "itemList",
        tab: 3,
        attributes: {maxlength: 5000, rows: 2},
        params: {
            key: "id",
            showCheck: true
        },

        optional: true,
        defaultValue: [{id: 1, text: '...'}],
    },

    {
        field: "rowsTest",
        fieldType: "rows",
        tab: 3,
        attributes: {},
        params: {
            key: "row",
            config: {
                field1: {
                    field: "field1",
                    fieldType: "input",

                    css: "has-max-width-6rem",
                    attributes: {type: "text"},
                    params: {},
                    optional: true,
                    defaultValue: "",
                },
            },
        },

        css: "",
        optional: true,
        defaultValue: [],
    }
];
