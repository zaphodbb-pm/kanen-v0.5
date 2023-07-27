/**
 * Configuration list block for CookingNowSearch page listing.
 *
 * @name cookingNowSearch_list
 * @constant {Object}
 * @memberOf Pages:cookingNowSearch
 * @locus Client
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *          _id =                   String: id for the document in that table row
 *          cookingNowId =          String: FCnnn-CN_ss
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
 *          subTitle =              String: text (optional)
 *          writer =                String: author
 *
 *          image =                 Object: encoded image data
 *          body =                  String: html body text with any images (editable)
 *
 * list config object:      see /imports/Components/listCollections/listHolder.svelte for details
 *      field:      {String}  - unique field name in database
 *      key:        {String}  - field name or child key as field.child
 *      type:       {String}  - cell widget, see /imports/Components/listCollections/listTable.svelte
 *      label:      {String}  - field that will be overridden by text from <file>_text.js
 *      filter:     {Object}  - filter configuration information
 *      filterText: {Object}  - text for various parts of a filter
 *      condition:  {Object}  - general MongoDb search criterion merged with other items for a final query: {$gte: now}
 *      sort:       {Number}  - ascending (1) or descending (-1) or none (0)
 *      search:     {Boolean} - search bar can use this field for any search
 *
 *      prefix:     {String}  - adds a prefix to the field value in a table
 *      suffix:     {String}  - adds a suffix to the field value in a table
 *
 */



export default {
    sort: {"sortName": 1, "name": 1},

    fields: [
        {
            field:  "image",
            key:    "image",
            type:   "cardImage",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "name",
            key:    "name",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "writer",
            key:    "writer",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: true,
        },

        {
            field:  "issue",
            key:    "issue",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: true,
        },

        {
            field:  "body",
            key:    "body",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: true,
        }
    ]
}
