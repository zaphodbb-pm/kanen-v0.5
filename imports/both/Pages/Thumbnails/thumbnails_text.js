/**
 * Text for thumbnails page.
 *
 * @name thumbnails_text
 * @constant {Object}
 * @memberOf Pages:thumbnails
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Thumbnails",
        subtitle:   "Content Manager controlled thumbnails collection management.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Thumbnails Form",
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

            type: {
                label: "Type",
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

            thumbnail: {
                label: "Thumbnail",
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Thumbnails List",
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
