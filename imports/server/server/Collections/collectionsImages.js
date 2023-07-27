/**
 * @summary Special provisions for images (server side only)
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function collectionsImages
 * @locus Server
 *
 * @return {Object} collection
 *
 */


import { Meteor } from 'meteor/meteor';
import { createBucket } from './gridFS/createBucket'
import { createAfterUpload } from './gridFS/createAfterUpload'
import { createInterceptDownload } from './gridFS/createInterceptDownload'
import { createOnAfterRemove } from './gridFS/createOnAfterRemove'

// @ts-ignore
import { FilesCollection } from 'meteor/ostrio:files';

const imageBucket = createBucket('allImages');

export const Images = new FilesCollection({
    debug: false, // Change to `true` for debugging
    collectionName: 'images',
    allowClientCode: true,

    onBeforeUpload(fileData){
        const me = this.user();
        const allowAccess = (me._id === this.file.userId) || ["administrator", "siteAdmin"].includes(me?.role?._id) || me.admin;

        if(allowAccess){
            let existingFile = Images.find({name: fileData.name}).count();

            //** remove all old versions of file
            if(existingFile > 0){
                Images.remove({name: fileData.name});
            }
        }

        return allowAccess;
    },

    onBeforeRemove(cursor) {
        const me = this.user();

        if(!me){ return false; }        // user not logged in

        const isAdmin = ["administrator", "siteAdmin"].includes(me?.role?._id) || me.admin;
        if(isAdmin){ return true;}      // admin over-rides file ownership

        const records = cursor.fetch();

        if (records && records.length) {
            for (let i = 0, len = records.length; i < len; i++) {
                const file = records[i];

                if(me._id !== file.userId){
                    // Return false if at least one document is not owned by current user
                    return false;
                }
            }
        }

        return true;
    },

    onAfterUpload: createAfterUpload(imageBucket),
    interceptDownload: createInterceptDownload(imageBucket),
    onAfterRemove: createOnAfterRemove(imageBucket)
});


Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});




const thumbnailsBucket = createBucket('allThumbnails');

export const Thumbnails = new FilesCollection({
    debug: false, // Change to `true` for debugging
    collectionName: 'thumbnails',
    allowClientCode: true,

    onBeforeUpload(fileData){
        const me = this.user();
        const allowAccess = (me._id === this.file.userId) || ["administrator", "siteAdmin"].includes(me?.role?._id) || me.admin;

        if(allowAccess){
            let existingFile = Thumbnails.find({name: fileData.name}).count();

            //** remove all old versions of file
            if(existingFile > 0){
                Thumbnails.remove({name: fileData.name});
            }
        }

        return allowAccess;
    },

    onBeforeRemove(cursor) {
        const me = this.user();

        if(!me){ return false; }        // user not logged in

        const isAdmin = ["administrator", "siteAdmin"].includes(me?.role?._id) || me.admin;
        if(isAdmin){ return true;}      // admin over-rides file ownership

        const records = cursor.fetch();

        if (records && records.length) {
            for (let i = 0, len = records.length; i < len; i++) {
                const file = records[i];

                if(me._id !== file.userId){
                    // Return false if at least one document is not owned by current user
                    return false;
                }
            }
        }

        return true;
    },

    onAfterUpload: createAfterUpload(thumbnailsBucket),
    interceptDownload: createInterceptDownload(thumbnailsBucket),
    onAfterRemove: createOnAfterRemove(thumbnailsBucket)
});


Meteor.publish('files.thumbnails.all', function () {
    return Thumbnails.find().cursor;
});
