/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name logsSystem_access_control
 * @constant {Object}
 * @memberOf Pages:logsSystem
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './logsSystem_list'
import {roles} from'./logsSystem_nav'

import {buildAllFields} from '../../../Functions/supportApplication/buildAllFields'

export default {
    logsSystem: {
        coll: "logsSystem",
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
