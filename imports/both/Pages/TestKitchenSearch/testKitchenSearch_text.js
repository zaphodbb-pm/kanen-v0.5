/**
 * @summary Labels for TestKitchenSearch page.
 *
 * @name testKitchenSearch_text
 * @constant {Object}
 * @memberOf Pages:testKitchenSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {element, list}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Test Kitchen Search Page",
        lead:   "Search through the great Test Kitchen items from Fine Cooking.",
        body:   "",
    }
};


export const page = {

    list: {
        en: {
            labels: {
                hdr: "List of Test Kitchen Items",
                addNew: ""
            },

            name: {
                label: "Name",
            },

            Issue: {
                label: "Issue",
            },

            type: {
                label: "Type",
                filter: [
                    {_id: "all",            name: "All"},
                    {_id: "equipment",      name: "Equipment"},
                    {_id: "foodScience",    name: "Food Science"},
                    {_id: "glossary",       name: "Glossary"},
                    {_id: "history",        name: "History"},
                    {_id: "ingredient",     name: "Ingredient"},
                    {_id: "recipe",         name: "Recipe"},
                    {_id: "technique",      name: "Technique"},
                    {_id: "tip",            name: "Tip"},
                    {_id: "tool",           name: "Tool"},
                ]
            },

            image: {
                label: "Thumbnail",
            },

            _id: {
                label: "Del",
            }
        }
    }
};
