import {Meteor} from "meteor/meteor";
import { check } from 'meteor/check';

//import {Images, Thumbnails} from "../Collections/collectionsImages";

import {Images, Thumbnails} from "../Collections/collectionsImages-s3";

import {accessControl} from '../setupACL';
import {verifyRole} from '../Functions/verifyRole';


Meteor.methods({

    /**
     * Update a field in the Images collection.
     *
     * @function updateImage
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} name
     * @param {Object} field - {field: value}
     *
     * @return {Object}
     */

    updateImage: function (name, field) {
        check(name, String);
        check(field, Object);

        const me = Meteor.user();
        const acl = accessControl["images"];

        if( verifyRole(me, acl.roles) ) {
            Images.update({name: name}, {$set: field});

            return {status: 200, text:  `${name} has been updated on Images by updateImage`};
        }else{

            return {status: 400, text: "Invalid user; does not have store privileges."};
        }
    },



    /**
     * Update a field in the Thumbnail collection.
     *
     * @function updateThumbnail
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} name
     * @param {Object} field - {field: value}
     *
     * @return {Object}
     */

    updateThumbnail: function (name, field) {
        check(name, String);
        check(field, Object);

        const me = Meteor.user();
        const acl = accessControl["thumbnails"];

        if( verifyRole(me, acl.roles) ) {
            Thumbnails.update({name: name}, {$set: field});

            return {status: 200, text:  `${name} has been updated on Thumbnails by updateThumbnail`};
        }else{

            return {status: 400, text: "Invalid user; does not have store privileges."};
        }
    }
});
