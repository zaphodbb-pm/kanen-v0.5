/**
 * Text for Magazines page.
 *
 * @name magazines_text
 * @constant {Object}
 * @memberOf Pages:magazines
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Magazines",
        subtitle:   "Fine Cooking magazines list edits.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr: "Edit Magazine Form",
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
            magazineId: {
                label: "Magazine Id",
                helpText: 'Format as: issue_nnn, where "nnn" is the issue number.',
            },

            issue: {
                label: "Magazine Issue Number",
            },

            image: {
                label: "Magazine Cover Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            systemPDF: {
                label: "System Stored PDF file name",
            },

            pdfLink: {
                label: "Facebook Google Drive Link",
            },

            zinioLink: {
                label: "URL to finecooking.zinioapps.com",
            },

            archiveLink: {
                label: "URL to archive.org",
            }
        }
    },

    list: {
        en: {

            labels: {
                hdr: "Magazine List",
                addNew: "Add New"
            },


            magazineId: {
                label: "Magazine Id",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
