/**
 * Configuration list block for LogsSystem page listing.
 *
 * @name logsSystem_list
 * @constant {Object}
 * @memberOf Pages:logsSystem
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
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
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
