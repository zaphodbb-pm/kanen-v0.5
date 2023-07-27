/**
 * Schema definition object for Notes collection.
 *
 * @name notes_form_schema
 * @constant {Object}
 * @memberOf Pages:notes
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * One record per subscriber
 * Schema items
 *          name =                  String: name of a menu
 *          recipeId =              String: targetted recipe
 *          notes =                 Array: list of notes added by user
 *
 *      Automatically added by system during submit phase:
 *          author =                String: unique user id
 *          username =              String: system username for additional tracking
 *          authorName =            String: author name or username
 *          authorFullName =        String: First Name + Last Name from user profile
 *          sortName =              String: document name in lower case to make sorting case independent
 *          tenantId =              String: user tenantId when in multi-tenant mode
 *          updatedAt =             Number: epoch timestamp
 *          createdAt =             Number: epoch timestamp
 *
 */


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
        field: "recipeId",
        fieldType: "input",
        optional: true,

        attributes: {type: "text", maxlength: 32},
        params: {},
        defaultValue: "",
    },

    {
        field: "notes",
        fieldType: "itemList",

        attributes: {maxlength: 5000, rows: 2},
        params: {
            key: "id",
            showCheck: false
        },

        optional: true,
        defaultValue: [],
    }
];
