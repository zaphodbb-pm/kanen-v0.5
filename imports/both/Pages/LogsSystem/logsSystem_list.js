/**
 * Configuration list block for LogsSystem page listing.
 *
 * @memberOf Pages:logsSystem
 * @function logsSystem_list
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      tag =               String: item name with tag applied
 *      timestamp =         String: unix timestamp converted to time ago format
 *      data =              String: object data converted to string
 *      del =               String: "del" flag for showing trash can
 *
 * list config object:
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
 */



export default {
    sort: {"timeStamp": -1},

    fields: [
        {
            field: "tag",
            key: "tag",
            type: "tag",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "timeStamp",
            key: "timeStamp",
            type: "timeStamp",
            label: "tbd",
            sort: 1,
            search: true,
            filter: {
                mode: "range"
            }
        },

        {
            field: "data",
            key: "data",
            type: "object",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "_id",
            key: "_id",
            type: "del",
            label: "tbd",
            sort: false,
            search: false,
        },
    ]
}
