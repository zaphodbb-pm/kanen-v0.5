/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name buildContent_access_control
 * @constant {Object}
 * @memberOf Pages:buildContent
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */

import schema from './buildContent_form_schema';
import list from './buildContent_list'
import {roles} from'./buildContent_nav'

import {fieldAddons} from '../../../server/fieldAddons'
import {buildAllFields} from '../../../Functions/application/buildAllFields'

export default {
    buildContent: {
        coll: "learn",
        roles: roles,

        listShort: {
            name: 1,
            parentPage: 1,
            contentWeight: 1,
            updatedAt: 1
        },
        listMedium: null,
        listLong: null,
        listList: buildAllFields(list.fields, {}),

        schemaShort: null,
        schemaMedium: null,
        schemaLong: buildAllFields(schema),
        schemaForm: buildAllFields(schema, fieldAddons),

        selects: null
    }
}
