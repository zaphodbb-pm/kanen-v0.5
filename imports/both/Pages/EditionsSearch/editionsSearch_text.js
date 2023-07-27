/**
 * Text for EditionsSearch page.
 *
 * @name editionsSearch_text
 * @constant {Object}
 * @memberOf Pages:editionsSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Editions Search",
        subtitle:   "Fine Cooking Archives.",
        body:   "<p>There are 3 archives for Fine Cooking editions: </p>" +
            "<ul>" +
            "<li>The archive maintained by the Fine Cooking Community on Facebook.  " +
            "This requires that you be a member of the group.</li>" +
            "<li>Meredith has enabled (for now) access to the Fine Cooking editions on Zinio.</li>" +
            "<li>Archive.org (owners of the Wayback Machine) has archived the first 113 Fine Cooking issues.</li>" +
            "</ul>",
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
            editionsSearchId: {
                label: "EditionsSearch Id",
                helpText: 'Format as: FCnnn-CN_ss, where "nnn" is the issue number and "ss" is the sequence number in the ' +
                    'edition issue',
            },

            page: {
                label: "Page Number",
            },

            issue: {
                label: "Edition Issue Number",
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
                hdr: "Editions List",
                addNew: "Add New"
            },

            editionsSearchSearchId: {
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
