/**
 * Text for Recipes page.
 *
 * @name recipes_text
 * @constant {Object}
 * @memberOf Pages:recipes
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */

import {cookingMethod} from "../../../client/text_tag-cookingMethod";
import {course} from "../../../client/text_tag-course";
import {cuisine} from "../../../client/text_tag-cuisine";
import {dish} from "../../../client/text_tag-dish";
import {ingredient} from "../../../client/text_tag-ingredient";
import {considerations} from "../../../client/text_tag-considerations";

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Recipes",
        subtitle:   "Fine Cooking main recipes edits",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Recipe Form",
                txt:        "",
                clone:      false,
                cloneBtn:   "Clone Item",
                createBtn:  "Create New Doc",
                editBtn:    "Save Content Edit",
                backBtn:    "Back to List",
                previewBtn: "Preview",

                invalidInput:  {
                    prefix: "Can't submit: ",
                    suffix1: " item needs your attention: ",
                    suffixn: " items need your attention: "
                }
            },

            formTabs: [],


            //** Form field text ********************************************
            recipeId: {
                label: "Recipe Id",
                helpText: 'Format as: issue_nnn-REC_ss, where "nnn" is the issue number and "ss" is the sequence number in the ' +
                    'magazine issue',
            },

            type: {
                label: "Recipe Type",
                selects: [
                    {_id: "main", name: "Main"},
                    {_id: "makeItTonight", name: "Make It Tonight"},
                    {_id: "moveableFeast", name: "Moveable Feast"},
                ]
            },

            articleId: {
                label: "Associated Article Id",
                helpText: "FC000_ART_00"
            },

            issue: {
                label: "Magazine Issue",
                helpText: 'Magazine Issue in the format of "FC000 Jan/Feb 1994 page: 00" ',
            },

            name: {
                label: "Recipe Title",
            },

            subTitle: {
                label: "Recipe Sub Title (optional)",
            },

            commentary: {
                label: "Recipe Commentary",
            },

            writer: {
                label: "Recipe Author",
            },

            attribution: {
                label: "Recipe Attributions",
            },

            serves: {
                label: "Servings for Recipe",
            },

            image: {
                label: "Recipe Main (Header) Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The input file size is limited to 2,000KB.  " +
                    "The file will be scaled down to nominally 500px wide and formatted as a jpeg file.",
            },

            thumbnail: {
                label: "Recipe Thumbnail Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The input file size is limited to 2,000KB.  " +
                    "The file will be scaled down to nominally 96px wide and formatted as a jpeg file.  " +
                    "This file will be used in lists as a small image.",
            },

            ingredients: {
                label: "Ingredients",
            },

            instructions: {
                label: "Instructions",
            },

            pairWith: {
                label: "Pair With",
            },

            cookingMethod: {
                label: "Cooking Method (typeahead)",
                selects: cookingMethod.en
            },

            course: {
                label: "Course (typeahead)",
                selects: course.en
            },

            cuisine: {
                label: "Cuisine (typeahead)",
                selects: cuisine.en
            },

            dish: {
                label: "Dish (typeahead)",
                selects: dish.en
            },

            mainIngredient: {
                label: "Main Ingredient (typeahead)",
                selects: ingredient.en
            },

            specialConsideration: {
                label: "Special Consideration (typeahead)",
                selects: considerations.en
            }
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Recipes List",
                addNew: "Add New"
            },

            recipeId: {
                label: "Recipe Id",
            },

            type: {
                label: "Type",
            },

            name: {
                label: "Title",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
