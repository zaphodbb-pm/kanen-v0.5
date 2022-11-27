/**
 * Publish / subscribe block for Real Time data.
 *
 * @function realTime
 * @memberOf Server:Publish:
 * @locus Server
 *
 * @returns {Object} - fieldAddons: {updatedAt, author, authorName, authorFullName, group, tenantId}
 */


import {Meteor} from "meteor/meteor"
import {check} from "meteor/check";

import {ChangeStreams} from '../Functions/ChangeStreams';
import {RealTime} from "../../both/collectionDefs";


// @ts-ignore
Meteor.publish("testRealTime", function (pipeline, options){
    if (pipeline) {
        check(pipeline, Array);
    } else {
        pipeline = [];
    }

    if (options) {
        check(options, Object);
    } else {
        options = {};
    }

    return new ChangeStreams(RealTime, pipeline, options);
});


//* stop users from bypassing normal Methods
RealTime.deny({
    update: function () {
        return true;
    },
    insert: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
