/**
 * Text for complex fieldset rows on the Favourites page.
 *
 * @name favourites_form_text_rows
 * @constant {Object}
 * @memberOf Pages:favourites
 * @locus Client
 *
 * @property {Object} default - formText for rows in a form field
 *
 * @notes
 *    Field types set:
 *      field1 = recipeThumbnail - fileGridFS
 *      field2 = recipeId - input field text
 *      field3 = recipeName - textarea
 *      field4 = notes - textarea
 *
 */
import {documents} from "../../systemGlobals";


export default {

    recipeThumbnail:     {
        field: "recipeThumbnail",
        fieldType: "fileGridFS",
        optional: true,
        adjustLabel: true,

        css: "has-max-width-15rem",
        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: documents.SIZE_GRID_THUMBNAIL,
            coll: "thumbnails",
        },
        defaultValue: {name: "", src: ""},
    },

    recipeId: {
        field: "recipeId",
        fieldType: "input",

        css: "has-max-width-10rem",
        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "na",
    },

    recipeName: {
        field: "recipeName",
        fieldType: "textarea",

        css: "width-33",
        attributes: {maxlength: 2000, rows: 2},
        params: {},
        optional: true,
        defaultValue: "Add recipe name.",
    },

    notes: {
        field: "notes",
        fieldType: "textarea",
        optional: true,

        css: "width-33",
        attributes: {maxlength: 10000, rows: 3},
        params: {},
        defaultValue: "",
    }
};
