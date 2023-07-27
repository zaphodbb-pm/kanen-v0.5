/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name testKitchenShow_access_control
 * @constant {Object}
 * @memberOf Pages:testKitchenShow
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './testKitchenShow_list';
import {roles} from './testKitchenShow_nav';

import {buildAllFields} from '../../../Functions/application/buildAllFields';

export default {
    testKitchenShow: {
        coll: "testKitchen",
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
