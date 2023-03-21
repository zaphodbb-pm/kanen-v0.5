/**
 * Configuration list block for Starter page listing.
 *
 * @name starter_list
 * @constant {Object}
 * @memberOf Pages:starter
 * @locus Client
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      name =              String: item name
 *      startStaticSelect = Object: option from selector
 *      startDateTime =     String: YYYY-mm-dd format
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
            field:  "startImage",
            key:    "startImage",
            type:   "cardImage",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "startStaticSelect",
            key:    "startStaticSelect.name",
            type:   "select",
            label:  "tbd",
            sort:   1,
            search: true,
            filter: {_id: "none", name: "None"}
        },

        {
            field:  "startDateTime",
            key:    "startDateTime",
            type:   "date",
            label:  "tbd",
            sort:   1,
            search: true,
            filter: {mode: "range"}
        },


        /*
        {
            field:  "geoLocation",
            key:    "geoLocation",
            type:   "address",
            label:  "tbd",
            sort:   false,
            search: true,
            filter: {_id: "none", name: "World Wide"}
        },

         */


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
