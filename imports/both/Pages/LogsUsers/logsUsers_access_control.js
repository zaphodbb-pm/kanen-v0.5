/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name logsUsers_access_control
 * @constant {Object}
 * @memberOf Pages:logsUsers
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './logsUsers_list'
import {roles} from'./logsUsers_nav'

import {buildAllFields} from '../../../Functions/supportApplication/buildAllFields'

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
