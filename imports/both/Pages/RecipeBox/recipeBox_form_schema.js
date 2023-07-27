/**
 * Schema definition object for recipeBox collection.
 *
 * @name recipeBox_form_schema
 * @constant {Object}
 * @memberOf Pages:recipeBox
 * @locus Anywhere
 *
 * @property {Array} default - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =                  String: name of a menu
 *          description =           String: menu description
 *          recipes =               Array of recipe objects as below
 *
 *          recipes.recipeId =      String: unique id entered by content manager
 *          recipes.name =          String: recipe name
 *          recipes.notes =         Array:  objects {id, text}
 *          recipes.thumbnail =     String: thumbnail url
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
import fieldsetRows from "./recipeBox_form_config_rows";


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
        field: "description",
        fieldType: "textarea",
        optional: true,

        attributes: {maxlength: 2000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "recipes",
        fieldType: "rows",
        attributes: {},
        params: {
            key: "row",
            config: fieldsetRows,
        },

        css: "",
        optional: true,
        defaultValue: [],
        role: ["administrator"]
    }
];
