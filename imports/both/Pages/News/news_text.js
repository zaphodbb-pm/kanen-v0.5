/**
 * Text for News page.
 *
 * @name news_text
 * @constant {Object}
 * @memberOf Pages:news
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "News",
        subtitle:   "This sites news items to add or edit.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr: "Edit News Form",
                txt: "",
                clone: false,
                cloneBtn: "Clone Item",
                createBtn: "Create New Doc",
                editBtn: "Save Content Edit",
                backBtn: "Back to List",
                previewBtn: "Preview",

                invalidInput: {
                    prefix: "Can't submit: ",
                    suffix1: " item needs your attention: ",
                    suffixn: " items need your attention: "
                }
            },

            formTabs: [],


            //** Form field text ********************************************
            name: {
                label: "Title",
            },

            image: {
                label: "Image (optional)",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            body: {
                label: "News Item",
            }
        }
    },

    list: {
        en: {

            labels: {
                hdr: "News List",
                addNew: "Add New"
            },


            name: {
                label: "Name",
            },

            updatedAt: {
                label: "Updated",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
