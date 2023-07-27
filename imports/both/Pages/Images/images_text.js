/**
 * Text for images page.
 *
 * @name images_text
 * @constant {Object}
 * @memberOf Pages:images
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "images",
        subtitle:   "Content Manager controlled images collection management.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit images Form",
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
                label: "Name",
            },

            link: {
                label: "Link",
            },

            location: {
                label: "Location",
            },

            size: {
                label: "Size",
            },

            type: {
                label: "Type",
            },

            image: {
                label: "Image",
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "images List",
                addNew: "Add New"
            },

            name: {
                label: "Name",
            },

            location: {
                label: "Location",
            },

            size: {
                label: "Size",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
