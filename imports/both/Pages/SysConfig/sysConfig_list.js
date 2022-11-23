/**
 * Configuration list block for SysConfig page listing.
 *
 * @name sysConfig_list
 * @constant {Object}
 * @memberOf Pages:sysConfig
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
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
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
            field:  "updatedAt",
            key:    "updatedAt",
            type:   "text",
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
        }
    ]
}
