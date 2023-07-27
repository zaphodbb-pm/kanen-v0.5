/**
 * Text for Articles page.
 *
 * @name articles_text
 * @constant {Object}
 * @memberOf Pages:articles
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */




//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Articles Edit",
        subtitle:   "Fine Cooking main articles edit center",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Article Form",
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
            articleId: {
                label: "Article Id",
                helpText: 'Format as: FCnnn-ART_ss, where "nnn" is the issue number and "ss" is the sequence number in the ' +
                    'magazine issue',
            },

            type: {
                label: "Article Type",
                selects: [
                    {_id: "main",           name: "Main"},
                    {_id: "ingredient",     name: "Ingredient"},
                    {_id: "inSeason",       name: "In Season"},
                    {_id: "movableFeast",   name: "Movable Feast"},
                    {_id: "howTo",          name: "How To"},
                    {_id: "makeYourOwn",    name: "Make Your Own"},
                    {_id: "foodScience",    name: "Food Science"},
                ]
            },

            issue: {
                label: "Magazine Issue",
                helpText: 'Magazine Issue in the format of "FC000 Jan/Feb 1994 page: 00" ',
            },

            name: {
                label: "Article Title",
            },

            subTitle: {
                label: "Article Sub Title",
            },

            writer: {
                label: "Content Author",
            },

            attribution: {
                label: "Article Attributions",
            },

            image: {
                label: "Article Main (Header) Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            body: {
                label: "Main Body Text",
                tag: "Add your content..."
            },

            recipes: {
                label: "Associated Recipes",
                helpText: 'This article references a number of recipes.  The recipe id is in the form "issue_nnn_REC_ss." ',
            }
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Articles List",
                addNew: "Add New"
            },

            articleId: {
                label: "Article Id",
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
