/**
 * Configuration list block for EditionsSearch page listing.
 *
 * @name editionsSearch_list
 * @constant {Object}
 * @memberOf Pages:editionsSearch
 * @locus Client
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *          _id =                   String: id for the document in that table row
 *          editionId =            String: FCnnn
 *          issue =                 String: edition issue as "FC000 Jan/Feb 1994"
 *
 *          image =                 Object: encoded image data
 *          pdfLink =               String: long url to facebook group google drive
 *          zinioLink =             String: long link url to finecooking.zinioapps.com
 *          archiveLink =           String: long url to archive.org
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
    sort: {"editionId": 1},

    fields: [
        {
            field:  "issue",
            key:    "issue",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: true,
        },

        {
            field:  "editionId",
            key:    "editionId",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "image",
            key:    "image",
            type:   "cardImage",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "pdfLink",
            key:    "pdfLink",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "zinioLink",
            key:    "zinioLink",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: false,
        },

        {
            field:  "archiveLink",
            key:    "archiveLink",
            type:   "text",
            label:  "tbd",
            sort:   false,
            search: false,
        },

    ]
}
