/**
 * Schema definition object for BuildContent collection.
 *
 * @name buildContent_form_schema
 * @constant {Object}
 * @memberOf Pages:buildContent
 * @locus Anywhere
 *
 * @property {Array} default  - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =              String: name of this document
 *          contentLang =       String: static select box; two letter language code
 *          parentPage =        Object: dynamic select box; name and id number of parent page to attach to
 *          contentWeight =     Number: sets page position relative to other pages
 *          contentLead =       String: lead text
 *          contentSummary=     String: summary text
 *          contentPage=        String: JSON.stringify version of the html + css content
 *
 *
 * Config Object: see /imports/Components/formBuilder/formHolder.svelte for details
 *
 */


export default [

    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        optional: false,

        tab: 0,
        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentLang",
        fieldType: "select",
        optional: true,

        tab: 0,
        attributes: {},
        css: "is-fullwidth",
        params: {type: "staticSelect"},
        defaultValue: {_id: "all", name: ""},
    },

    {
        field: "parentPage",
        fieldType: "select",
        optional: true,

        tab: 0,
        attributes: {},
        css: "is-fullwidth",
        params: {
            type: "dynamicSelect",
            coll: "learn",
            filter: {sort: {name: 1}, fields: {name: 1}},
            prepend: {_id: "aaaRootDocument", name: "_rootPage"}       // for buildContent; add a root choice for table of contents building
        },
        defaultValue: {_id: "aaaRootDocument", name: "_rootPage"},
    },

    {
        field: "contentWeight",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "number", min: 1, max: 25, step: 1},
        params: {},
        defaultValue: 0,
    },

    {
        field: "contentLead",
        fieldType: "textarea",
        optional: true,

        tab: 0,
        attributes: {maxlength: 300, rows: 2},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentSummary",
        fieldType: "textarea",
        optional: true,

        tab: 0,
        attributes: {maxlength: 1000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentPage",
        fieldType: "editor",
        optional: true,

        tab: 0,
        attributes: {maxlength: 50000},
        params: {},
        defaultValue: "",
    }
];
