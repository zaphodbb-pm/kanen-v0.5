/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name recipesSearch_access_control
 * @constant {Object}
 * @memberOf Pages:recipesSearch
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './recipesSearch_list';
import {roles} from './recipesSearch_nav';

import {buildAllFields} from '../../../Functions/application/buildAllFields';

export default {
    recipesSearch: {
        coll: "recipes",
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
