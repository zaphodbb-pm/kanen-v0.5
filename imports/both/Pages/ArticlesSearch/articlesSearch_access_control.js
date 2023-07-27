/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name articlesSearch_access_control
 * @constant {Object}
 * @memberOf Pages:articlesSearch
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './articlesSearch_list';
import {roles} from './articlesSearch_nav';

import {buildAllFields} from '../../../Functions/application/buildAllFields';

export default {
    articlesSearch: {
        coll: "articles",
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
