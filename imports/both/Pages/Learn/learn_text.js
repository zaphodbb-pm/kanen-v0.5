/**
 * Text for Learn page.
 *
 * @name learn_text
 * @constant {Object}
 * @memberOf Pages:learn
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Learn Page",
        lead:   "Set of learn pages",
        body:   "",
    }
};


export const page = {

    components: {
        en: {
            toc: {
                title: "Table of Contents"
            },

            modal: {
                title: "Author Detail",

                username: "System User Name",
                name: "Full Name",

                image: "Photo",
                role: "Role",
                mainEmail: "Main Email",
                secondaryEmail: "Secondary Email",
                phone: "Phone",
                active: "Active",
                updatedAt: "Updated",

                addEvent: "Add",
                removeEvent: "Remove",

                noAccess: "You do not have the privileges to access to this information.",

                noUserFound: "Error: no user found"
            },

            messages: {
                msgAddEvent: "Add event button clicked",
                msgRemoveEvent: "Remove event button clicked",
            }
        }
    },

    form: {
        en: {
            getLang: {
                label: "Select Content Language",
                helpText: "Content can be tagged for different languages.",
                tag: {_id: "all", name: "Select Language"},
                selects: [
                    {_id: "all", name: "All Languages"},
                    {_id: "en",  name: "English"},
                    {_id: "fr",  name: "Francais"},
                    {_id: "es",  name: "Espaniol"},
                ]
            },

            readMode: {
                label: "Read  Mode",
                helpText: "Magazine mode formats the text layout into columns and page breaks.",
                tag: "Magazine",
            }
        }
    },
};
