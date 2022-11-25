/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name logsUser_access_control
 * @constant {Object}
 * @memberOf Pages:logsUser
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './logsUser_list'
import {roles} from './logsUser_nav'

import {buildAllFields} from '../../../Functions/supportApplication/buildAllFields'

export default {
    logsUser: {
        coll: "logsUser",
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
