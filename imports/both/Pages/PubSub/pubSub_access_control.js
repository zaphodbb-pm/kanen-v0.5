/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @name pubSub_access_control
 * @constant {Object}
 * @memberOf Pages:pubSub
 * @locus Server
 *
 * @property {Object} default - access control parameters
 *
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */


import {roles} from'./pubSub_nav'


export default {
    pubSub: {
        coll: "realTime",
        roles: roles,
    }
}
