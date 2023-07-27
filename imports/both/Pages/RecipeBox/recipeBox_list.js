/**
 * Configuration list block for recipeBox page listing.
 *
 * @name recipeBox_list
 * @constant {Object}
 * @memberOf Pages:recipeBox
 * @locus Client
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      name =              String: item name
 *      description =       String: issue number
 *
 *
 *      //updatedAt =         String: unix timestamp converted to time ago format
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
            field:  "name",
            key:    "name",
            type:   "edit",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "description",
            key:    "description",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: true,
        },

        {
            field:  "recipes",
            key:    "recipes",
            type:   "array",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "author",
            key:    "author",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "_id",
            key:    "_id",
            type:   "del",
            label:  "tbd",
            sort:   false,
            search: false,
        },
    ]
}
