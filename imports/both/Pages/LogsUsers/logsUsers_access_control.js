/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @memberof Pages:LogsUsers
 * @function logsUsers_access_control
 * @locus Server
 *
 * @returns {Object} - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './logsUsers_list'
import {roles} from'./logsUsers_nav'

import {buildAllFields} from '/imports/functions/supportApplication/buildAllFields'

export default {
    logsUsers: {
        coll: "logsUsers",
        roles: roles,

        listShort: null,
        listMedium: null,
        listLong: null,
        listList: buildAllFields(list.fields, {}),

        schemaShort: null,
        schemaMedium: null,
        schemaLong: null,
        schemaForm: null,

        selects: null
    }
}
