/**
 * Text for recipeBox page.
 *
 * @name recipeBox_text
 * @constant {Object}
 * @memberOf Pages:recipeBox
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Recipe Box Menus",
        subtitle:   "Fine Cooking main Recipe Box edit center",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Menu Form",
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
                    recipeThumbnail: {label: "Thumbnail"},
                    notes: {label: "Notes"},
                }
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Menu List",
                addNew: "Add New Menu"
            },

            gridText: {
                deleteMsg: "Are you sure you want to delete this menu?",
                copy: "Copy",
                move: "Move",
                delete: "Delete",

                askDelete: {
                    btnRemove: "Delete",
                    btnCancel: "Cancel",
                    deleteMsg: "Are you sure you want to delete this menu?"
                }
            },

            name: {
                label: "Menu Name",
            },

            description: {
                label: "Desc",
            },

            recipes: {
                label: "Recipes",
            },

            author: {
                label: "Author Id",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
