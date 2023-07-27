/**
 * Configuration list block for Magazines page listing.
 *
 * @name magazines_list
 * @constant {Object}
 * @memberOf Pages:magazines
 * @locus Client
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      magazineId =        String: issue number
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
    sort: {"magazineId": 1},

    fields: [
        {
            field:  "magazineId",
            key:    "magazineId",
            type:   "edit",
            label:  "tbd",
            sort:   1,
            search: true,
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