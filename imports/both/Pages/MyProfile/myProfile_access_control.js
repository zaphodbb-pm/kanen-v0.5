/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @memberOf Pages:myProfile
 * @function myProfile_access_control
 * @locus Server
 *
 * @returns {Object} - access control parameters
 *
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import schema from './myProfile_form_schema';
import {roles} from'./myProfile_nav'

import {buildAllFields} from '../../../functions/supportApplication/buildAllFields'
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
