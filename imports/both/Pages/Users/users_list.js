/**
 * Configuration list block for Users page listing.
 *
 * @memberOf Pages:users
 * @function users_list
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      username =          String: user name
 *      emails.address =    String: user primary email address
 *      tenantId =          String: user belongs to this group
 *      role =              String: user has this role
 *
 *      //updatedAt =       String: unix timestamp converted to time ago format
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
    sort: {"sortName": 1, "name": 1},

    fields: [
        {
            field:  "username",
            key:    "username",
            type:   "edit",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "emails",
            key: "emails.0.address",
            type:   "text",
            label: "tbd",
            sort:   1,
            search: true,
        },

        {
            field: "tenantId",
            key: "tenantId",
            type: "text",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "role",
            key:    "role.name",
            type:   "text",
            label: "tbd",
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
