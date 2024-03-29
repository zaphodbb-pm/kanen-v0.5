/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name learn_access_control
 * @constant {Object}
 * @memberOf Pages:learn
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import {roles} from'./learn_nav'

export default {
    learn: {
        coll: "learn",
        roles: roles,

        listShort: {
            name: 1,
            parentPage: 1,
            contentWeight: 1,
        },
        listMedium: null,
        listLong: null,
        listList: null,

        schemaShort: null,
        schemaMedium: null,
        schemaLong: null,
        schemaForm: null,

        selects: null
    }
}
