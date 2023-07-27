/**
 * Text for TestKitchen page.
 *
 * @name testKitchen_text
 * @constant {Object}
 * @memberOf Pages:testKitchen
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "TestKitchen Edit",
        subtitle:   "Fine Cooking main testKitchen edit center",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Edit Test Kitchen Form",
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
            testKitchenId: {
                label: "Test Kitchen Id",
                helpText: 'Format as: FCnnn-TK_ss, where "nnn" is the issue number and "ss" is the sequence number in the ' +
                    'magazine issue',
            },

            type: {
                label: "Item Type",
                selects: [
                    {_id: "equipment",      name: "Equipment"},
                    {_id: "foodScience",    name: "Food Science"},
                    {_id: "glossary",       name: "Glossary"},
                    {_id: "history",        name: "History"},
                    {_id: "ingredient",     name: "Ingredient"},
                    {_id: "product",        name: "Product"},
                    {_id: "recipe",         name: "Recipe"},
                    {_id: "technique",      name: "Technique"},
                    {_id: "tip",            name: "Tip"},
                    {_id: "tool",           name: "Tool"},
                ]
            },

            issue: {
                label: "Magazine Issue",
                helpText: 'Magazine Issue in the format of "FC000 Jan/Feb 1994 page: 00" ',
            },

            name: {
                label: "Item Title",
            },

            subTitle: {
                label: "Item Sub Title",
            },

            writer: {
                label: "Content Author",
            },

            attribution: {
                label: "Article Attributions",
            },

            image: {
                label: "Item Main (Header) Image",
                helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                    "The file size is limited to 500KB.",
            },

            body: {
                label: "Main Body Text",
                tag: "Add your content..."
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "TestKitchen List",
                addNew: "Add New"
            },

            testKitchenId: {
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
