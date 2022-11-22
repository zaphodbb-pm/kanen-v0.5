/**
 * Configuration list block for LogsUsers page listing.
 *
 * @memberOf Pages:logsUsers
 * @function logsUsers_list
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      tag =               String: item name with tag applied
 *      author =            String: user id
 *      username =          String: system Meteor username
 *      tenantId =          String: user's company / merchant id
 *      connection =        Object: Meteor's user connection info {id, ipAddr, userAgent, logTime}
 *
 *      updatedAt =         String: unix timestamp converted to time ago format
 *      _id =               String: "del" flag for showing trash can
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
    sort: {"updatedAt": -1},

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
            field:  "username",
            key:    "username",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "tenantId",
            key:    "tenantId",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field: "email",
            key: "email",
            type: "text",
            label: "tbd",
            sort: true,
            search: true,
        },

        {
            field: "connection",
            key: "connection",
            type: "object",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "updatedAt",
            key: "updatedAt",
            type: "timeStamp",
            label: "tbd",
            sort: 1,
            search: true,
            filter: {
                mode: "range"
            }
        },

        {
            field: "_id",
            key: "_id",
            type: "del",
            label: "tbd",
            sort: false,
            search: false,
        }
    ]
}
