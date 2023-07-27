/**
 * Text for Books page.
 *
 * @name books_text
 * @constant {Object}
 * @memberOf Pages:books
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Books",
        subtitle:   "Fine Cooking Books items to edit",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Books Form",
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

            issue: {
                label: "Magazine Issue Number",
            },

            name: {
                label: "Book Title",
            },

            subtitle: {
                label: "Book Sub-Title",
            },

            writer: {
                label: "Book Author",
            },

            image: {
                label: "Book Main (Header) Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            review: {
                label: "Book Review",
            }

        }
    },

    list: {
        en: {
            labels: {
                hdr: "Book List",
                addNew: "Add New"
            },

            issue: {
                label: "Issue Id",
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
