// @ts-ignore
import {Meteor} from "meteor/meteor"
// @ts-ignore
import {check} from "meteor/check";

import {ChangeStreams} from '../functions/ChangeStreams'

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

    // @ts-ignore
    return new ChangeStreams(RealTime, pipeline, options);
});


//* stop users from bypassing normal methods
// @ts-ignore
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
