/**
 * Text for favourites page.
 *
 * @name favourites_text
 * @constant {Object}
 * @memberOf Pages:favourites
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Favourites",
        subtitle:   "Content Manager controlled Favourites collection management.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Favourites Form",
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
            name: {
                label: "Menu",
            },

            description: {
                label: "Description",
            },

            recipes: {
                label: "Recipes",

                rowText: {
                    recipeId: {label: "Recipe Id"},
                    recipeName: {label: "Name"},
                    thumbnail: {label: "Thumbnail"},
                }
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Favourites List",
                addNew: "Add New"
            },

            name: {
                label: "Menu",
            },

            authorName: {
                label: "Author",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
