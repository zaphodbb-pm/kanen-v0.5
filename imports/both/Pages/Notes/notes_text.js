/**
 * Text for notes page.
 *
 * @name notes_text
 * @constant {Object}
 * @memberOf Pages:notes
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Notes",
        subtitle:   "Content Manager controlled Notes collection management.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Notes Form",
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
                label: "Recipe Name",
            },

            recipeId: {
                label: "Recipe Id",
            },

            notes: {
                label: "List of Notes",
            }
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Notes List",
                addNew: "Add New"
            },

            recipeId: {
                label: "Recipe Id",
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
