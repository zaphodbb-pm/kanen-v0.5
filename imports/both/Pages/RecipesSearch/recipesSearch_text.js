/**
 * @summary Labels for RecipesSearch page.
 *
 * @name recipesSearch_text
 * @constant {Object}
 * @memberOf Pages:recipesSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {element, list}
 *
 */

import {i18n} from "../../../Functions/utilities/i18n";
import {course} from "../../../client/text_tag-course";
import {cuisine} from "../../../client/text_tag-cuisine";

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Recipes Search Page",
        lead:   "Search through the great collection of recipes from Fine Cooking.",
        body:   "",
    }
};


export const page = {

    grid: {
        en: {
            tags: "Tags",
            recipeBox: "Add to Recipe Box",
        }
    },

    list: {
        en: {
            labels: {
                hdr: "List of Recipes",
                addNew: ""
            },

            name: {
                label: "Name",
            },

            Issue: {
                label: "Issue",
            },

            type: {
                label: "Type",
                filter: [
                    {_id: "all",            name: "All"},
                    {_id: "main",           name: "Main"},
                    {_id: "makeItTonight",  name: "Make It Tonight"},
                    {_id: "moveableFeast",  name: "Moveable Feast"},
                ]
            },

            course: {
                label: "Course",
                filter: i18n(course, "", ""),
            },

            cuisine: {
                label: "Cuisine",
                filter: i18n(cuisine, "", ""),
            },

            image: {
                label: "Thumbnail",
            }
        }
    }
};
