/**
 * @summary Labels for ArticlesSearch page.
 *
 * @name articlesSearch_text
 * @constant {Object}
 * @memberOf Pages:articlesSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {element, list}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Articles Search Page",
        lead:   "Search through the great collection of articles from Fine Cooking.",
        body:   "",
    }
};


export const page = {

    list: {
        en: {
            labels: {
                hdr: "List of Articles",
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
                    {_id: "main",           name: "Main"},
                    {_id: "ingredient",     name: "Ingredient"},
                    {_id: "inSeason",       name: "In Season"},
                    {_id: "movableFeast",   name: "Movable Feast"},
                    {_id: "howTo",          name: "How To"},
                    {_id: "makeYourOwn",    name: "Make Your Own"},
                    {_id: "foodScience",    name: "Food Science"},
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
