/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name articlesShow_access_control
 * @constant {Object}
 * @memberOf Pages:articlesShow
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import list from './articlesShow_list';
import {roles} from './articlesShow_nav';

import {buildAllFields} from '../../../Functions/application/buildAllFields';

export default {
    articlesShow: {
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