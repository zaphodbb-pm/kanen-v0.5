/**
 * Text for CookingNowSearch page.
 *
 * @name cookingNowSearch_text
 * @constant {Object}
 * @memberOf Pages:cookingNowSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Cooking Now Search",
        subtitle:   "",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Cooking Now Form",
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
            cookingNowSearchId: {
                label: "CookingNowSearch Id",
                helpText: 'Format as: FCnnn-CN_ss, where "nnn" is the issue number and "ss" is the sequence number in the ' +
                    'magazine issue',
            },

            page: {
                label: "Page Number",
            },

            issue: {
                label: "Magazine Issue Number",
            },

            name: {
                label: "Item Title",
            },

            subTitle: {
                label: "Item Sub Title",
            },

            writer: {
                label: "Item Author",
            },

            image: {
                label: "Item Main (Header) Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            body: {
                label: "Main Body Text",
                tag: "Add your content..."
            }
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Cooking Now List",
                addNew: "Add New"
            },

            cookingNowSearchId: {
                label: "Item Id",
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
