/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name testKitchenSearch_access_control
 * @constant {Object}
 * @memberOf Pages:testKitchenSearch
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './testKitchenSearch_list';
import {roles} from './testKitchenSearch_nav';

import {buildAllFields} from '../../../Functions/application/buildAllFields';

export default {
    testKitchenSearch: {
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
