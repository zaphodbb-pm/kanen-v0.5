/**
 * @summary Special collections for images (client side only)
 *
 * @memberof Structure:Both
 * @function collectionsImagesClient
 * @locus Client
 *
 * @return {Object} collections - Avatars, Images, Photos
 *
 */


import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { FilesCollection } from 'meteor/ostrio:files';


export const Images = new FilesCollection({
    debug: false, // Change to `true` for debugging
    collectionName: 'images',
    allowClientCode: true,
});

Meteor.subscribe('files.images.all');



export const Thumbnails = new FilesCollection({
    debug: false, // Change to `true` for debugging
    collectionName: 'thumbnails',
    allowClientCode: true,
});

Meteor.subscribe('files.thumbnails.all');