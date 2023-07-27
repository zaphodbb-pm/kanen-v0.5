/**
 * Configuration list block for RecipesShow page listing.
 *
 * @name recipesShow_list
 * @constant {Object}
 * @memberOf Pages:recipesShow
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *     _id =                String: id for the document in that table row
 *      image =             Object: {name, src} base64 encoded image
 *      name =              String: item name
 *      subTitle =          String: item subtitle
 *      writer =            String: item author
 *      attribution =       String
 *      type =              Object: {_id, name}
 *      issue =             String: FC000_ART_00
 *
 *      recipeId =          String
 *      articleId =         String
 *
 *      serves =            Number: shown as text
 *      ingredients =       String: html ul list
 *      instructions =      String: html <p> text
 *      pairWith =          String
 *
 *      cookingMethod =     String
 *      course =            String
 *      cuisine =           String
 *      mainIngredient =    String
 *      specialConsideration = String
 *
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
 *
 */



export default {
    sort: {"name": 1},

    fields: [
        {
            field: "image",
            key: "image",
            type: "cardImage",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "thumbnail",
            key: "thumbnail",
            type: "image",
            label: "tbd",
            sort: false,
            search: false,
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
            field: "commentary",
            key: "commentary",
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
            field: "type",
            key: "type.name",
            type: "text",
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
            field: "recipeId",
            key: "recipeId",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },


        {
            field: "articleId",
            key: "articleId",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "attribution",
            key: "attribution",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "serves",
            key: "serves",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "ingredients",
            key: "ingredients",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "instructions",
            key: "instructions",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "pairWith",
            key: "pairWith",
            type: "text",
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
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "cuisine",
            key: "cuisine.name",
            type: "text",
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
