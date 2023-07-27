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
 *      field1 = recipeId - input field text
 *      field2 = recipeName - textarea
 *      field3 = thumbnail - fileFridFS
 *
 */
import {documents} from "../../systemGlobals";


export default {

    recipeId: {
        field: "recipeId",
        fieldType: "input",

        css: "has-max-width-10rem",
        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    recipeName: {
        field: "recipeName",
        fieldType: "textarea",

        css: "has-max-width-10rem",
        attributes: {maxlength: 2000, rows: 2},
        params: {},
        optional: true,
        defaultValue: 0,
    },

    thumbnail:     {
        field: "thumbnail",
        fieldType: "fileGridFS",

        css: "width-50",
        attributes: {},
        params: {
            type: ["image.*"],
            resizeWidth: documents.SIZE_GRID_THUMBNAIL,
            coll: "thumbnails",
        },
        defaultValue: {name: "", src: ""},
    }
};
