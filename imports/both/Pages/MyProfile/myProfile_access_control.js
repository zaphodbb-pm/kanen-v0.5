/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name myProfile_access_control
 * @constant {Object}
 * @memberOf Pages:myProfile
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import schema from './myProfile_form_schema';
import {roles} from'./myProfile_nav'

import {buildAllFields} from '../../../Functions/supportApplication/buildAllFields'
import {fieldAddons} from '../../../server/fieldAddons'

export default {
    myProfile: {
        coll: "myProfile",
        roles: roles,

        listShort: null,
        listMedium: null,
        listLong: null,
        listList: null,

        schemaShort: null,
        schemaMedium: null,
        schemaLong: null,
        schemaForm: buildAllFields(schema, fieldAddons),

        selects: null
    }
}
