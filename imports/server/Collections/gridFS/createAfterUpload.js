/**
 * @summary FS Collection hook to handle uploaded image file.
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createAfterUpload
 * @locus Server
 *
 * @return nothing
 *
 */

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import fs from 'fs';
// @ts-ignore

export const createAfterUpload = bucket =>
    function onAfterUpload (file) {
        const self = this;

        // here you could manipulate your file
        // and create a new version, for example a scaled 'thumbnail'
        // ...

        // then we read all versions we have got so far
        Object.keys(file.versions).forEach(versionName => {
            const metadata = { ...file.meta, versionName, fileId: file._id };

            fs.createReadStream(file.versions[ versionName ].path)

                // this is where we upload the binary to the bucket using bucket.openUploadStream
                // see http://mongodb.github.io/node-mongodb-native/3.6/api/GridFSBucket.html#openUploadStream
                .pipe(bucket.openUploadStream(
                    file.name,
                    {
                        contentType: file.type || 'binary/octet-stream',
                        metadata
                    }
                ))

                // and we unlink the file from the fs on any error
                // that occurred during the upload to prevent zombie files
                .on('error', err => {
                    console.error(err);
                    self.unlink(this.collection.findOne(file._id), versionName); // Unlink files from FS
                })

                // once we are finished, we attach the gridFS Object id on the
                // FilesCollection document's meta section and finally unlink the
                // upload file from the filesystem
                .on('finish', Meteor.bindEnvironment(ver => {
                    const property = `versions.${versionName}.meta.gridFsFileId`;

                    self.collection.update(file._id, {
                        $set: {
                            [ property ]: ver._id.toHexString(),
                        }
                    });

                    self.unlink(this.collection.findOne(file._id), versionName); // Unlink files from FS
                }));
        });
    };