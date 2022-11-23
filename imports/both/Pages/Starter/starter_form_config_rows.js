/**
 * Text for complex fieldset rows on the Starter page.
 *
 * @name starter_form_text_rows
 * @constant {Object}
 * @memberOf Pages:starter
 * @locus Client
 *
 * @property {Object} default - formText for rows in a form field
 *
 * @notes
 *    Field types set:
 *      field1 = input field text
 *      field2 = input field number
 *      field3 = input field select
 *      field4 = switch
 */





export default {

    field1: {
        field: "field1",
        fieldType: "input",

        css: "has-max-width-6rem",
        attributes: {type: "text"},
        params: {},
        optional: true,
        defaultValue: "",
    },


    field2: {
        field: "field2",
        fieldType: "input",

        css: "has-max-width-5rem",
        attributes: {type: "number", min: 0, step: 1},
        params: {},
        optional: true,
        defaultValue: 0,
    },

    field3: {
        field: "field3",
        fieldType: "select",
        optional: true,

        css: "has-max-width-8rem",
        attributes: {},
        params: {type: "staticSelect"},
        defaultValue: {_id: "all", name: "All Options"},
    },

    field4: {
        field: "field4",
        fieldType: "switch",

        css: "has-max-width-10rem",
        attributes: {},
        params: {isCheck: true},
        optional: true,
        defaultValue: true,
    }
};
