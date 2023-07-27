/**
 * Text for Editions page.
 *
 * @name editions_text
 * @constant {Object}
 * @memberOf Pages:editions
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Editions",
        subtitle:   "Fine Cooking editions list edits.",
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
            editionId: {
                label: "Edition Id",
                helpText: 'Format as: issue_nnn, where "nnn" is the issue number.',
            },

            issue: {
                label: "Edition Issue Number",
            },

            image: {
                label: "Edition Cover Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            pdfLink: {
                label: "Facebook Google Drive Link",
            },

            zinioLink: {
                label: "URL to finecooking.zinioapps.com",
            },

            archiveLink: {
                label: "URL to archive.org",
            },



            hr1: {
                label: "",
                tag: "Group 1"
            },

            groupName1: {
                label: "Group Name 1",
            },

            groupList1: {
                label: "Group List 1",
            },



            hr2: {
                label: "",
                tag: "Group 2"
            },

            groupName2: {
                label: "Group Name 2",
            },

            groupList2: {
                label: "Group List 2",
            },



            hr3: {
                label: "",
                tag: "Group 3"
            },

            groupName3: {
                label: "Group Name 3",
            },

            groupList3: {
                label: "Group List 3",
            },



            hr4: {
                label: "",
                tag: "Group 4"
            },

            groupName4: {
                label: "Group Name 4",
            },

            groupList4: {
                label: "Group List 4",
            },



            hr5: {
                label: "",
                tag: "Group 5"
            },

            groupName5: {
                label: "Group Name 5",
            },

            groupList5: {
                label: "Group List 5",
            },



            hr6: {
                label: "",
                tag: "Group 6"
            },

            groupName6: {
                label: "Group Name 6",
            },

            groupList6: {
                label: "Group List 6",
            },



            hr7: {
                label: "",
                tag: "Group 7"
            },

            groupName7: {
                label: "Group Name 7",
            },

            groupList7: {
                label: "Group List 7",
            },



            hr8: {
                label: "",
                tag: "Group 8"
            },

            groupName8: {
                label: "Group Name 8",
            },

            groupList8: {
                label: "Group List 8",
            },



            hr9: {
                label: "",
                tag: "Group 9"
            },

            groupName9: {
                label: "Group Name 9",
            },

            groupList9: {
                label: "Group List 9",
            },



            hr10: {
                label: "",
                tag: "Group 10"
            },

            groupName10: {
                label: "Group Name 10",
            },

            groupList10: {
                label: "Group List 10",
            },


        }
    },

    list: {
        en: {

            labels: {
                hdr: "Edition List",
                addNew: "Add New"
            },


            magazineId: {
                label: "Edition Id",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
