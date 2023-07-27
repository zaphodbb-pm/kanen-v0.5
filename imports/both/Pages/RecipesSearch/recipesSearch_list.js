/**
 * Configuration list block for RecipesSearch page listing.
 *
 * @name recipesSearch_list
 * @constant {Object}
 * @memberOf Pages:recipesSearch
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *         _id =                    String: id for the document in that table row
 *          recipeId =              String: FCnnn-REC_ss
 *          type =                  Object: {_id, name}
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
 *          subTitle =              String: text (optional)
 *          writer =                String: author
 *
 *          image =                 Object: encoded image data
 *
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
 *
 */



export default {
    sort: {"name": 1},

    fields: [
        {
            field: "recipeId",
            key: "recipeId",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "type",
            key: "type.name",
            type: "select",
            filter: true,
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "issue",
            key: "issue",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "name",
            key: "name",
            type: "edit",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "subTitle",
            key: "subTitle",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "writer",
            key: "writer",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "thumbnail",
            key: "thumbnail",
            type: "cardImage",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "cookingMethod",
            key: "cookingMethod.name",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "course",
            key: "course.name",
            type: "select",
            filter: true,
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "cuisine",
            key: "cuisine.name",
            type: "select",
            filter: true,
            label: "tbd",
            sort: false,
            search: true,
        },

        /*

        {
            field: "dish",
            key: "dish.name",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

         */

        {
            field: "mainIngredient",
            key: "mainIngredient.name",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "specialConsideration",
            key: "specialConsideration.name",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        }
    ]
}
