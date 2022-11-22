/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @memberOf Pages:pubSub
 * @function pubSub_access_control
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
