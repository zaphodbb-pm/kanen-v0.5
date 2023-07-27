/**
 * @summary Special provisions for images (server side only)
 *
 * @memberOf Server:
 * @function collectionsImages
 * @locus Server
 *
 * @return {Object} collection
 *
 */


import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { FilesCollection } from 'meteor/ostrio:files';
// @ts-ignore
import S3 from 'aws-sdk/clients/s3'; /* http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html */
import {createAfterUpload} from "./s3/createAfterUpload";
import {createInterceptDownload} from "./s3/createInterceptDownload";
import {createOnAfterRemove} from "./s3/createOnAfterRemove";

const s3Conf = Meteor.settings.s3 || {};
const bound  = Meteor.bindEnvironment((callback) => {
    return callback();
});

/* Check settings existence in `Meteor.settings` */
const checkSettings =s3Conf && s3Conf.key && s3Conf.secret && s3Conf.images_bucket && s3Conf.thumbnails_bucket && s3Conf.region && s3Conf.endpoint;

if (!checkSettings) {
    throw new Meteor.Error(401, 'Missing Meteor file settings');
}



//* Create a new S3 object
const s3 = new S3({
    secretAccessKey: s3Conf.secret,
    accessKeyId: s3Conf.key,
    endpoint: s3Conf.endpoint,
    // sslEnabled: true, // optional
    httpOptions: {
        timeout: 6000,
        agent: false
    }
});

// Declare the Meteor file collection on the Server
export const Images = new FilesCollection({
    debug: false, // Change to `true` for debugging
    storagePath: 'assets/app/uploads/uploadedFiles',
    collectionName: 'images',
    allowClientCode: true,      // Disallow Client to execute remove, use the Meteor.method

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

    onAfterUpload: createAfterUpload(bound, s3, s3Conf.images_bucket, ""),
    interceptDownload: createInterceptDownload(s3, s3Conf.images_bucket),
    onAfterRemove: createOnAfterRemove(bound, s3, s3Conf.images_bucket)
});


Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});




export const Thumbnails = new FilesCollection({
    debug: false, // Change to `true` for debugging
    storagePath: 'assets/app/uploads/uploadedFiles',
    collectionName: 'thumbnails',
    allowClientCode: true,      // Disallow Client to execute remove, use the Meteor.method

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

    onAfterUpload: createAfterUpload(bound, s3, s3Conf.thumbnails_bucket, ""),
    interceptDownload: createInterceptDownload(s3, s3Conf.thumbnails_bucket),
    onAfterRemove: createOnAfterRemove(bound, s3, s3Conf.thumbnails_bucket)
});
