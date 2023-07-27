/**
 * @summary Labels for RecipesShow page.
 *
 * @name recipesShow_text
 * @constant {Object}
 * @memberOf Pages:recipesShow
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {element, list}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Read Selected Recipe",
        lead:   "",
        body:   "",
    }
};


export const page = {

    page: {
        en: {
            serves: "Serves",
            pairWith: "Pairs with",
            ingredients: "Ingredients",
            instructions: "Instructions",
            article: "See article",
            finecooking: "Fine Cooking Magazine: ",
            recipeBox: "Add to Recipe Box",
            notesTitle: "My Notes"
        }
    },

    pageActions: {
        en: {
            print: "Print",
            saveToMenus: "Save",
            mailRecipe: "Mail",
            notes: "Notes",
        }
    }
};
