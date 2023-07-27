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

// @ts-ignore
import fs from 'fs';

export const createAfterUpload = (bound, s3, bucket, prefix) =>
    function onAfterUpload(fileRef) {
    // Run through each of the uploaded file
    Object.keys(fileRef.versions).forEach((versionName, version) => {
        const vRef = fileRef.versions[ versionName ];
        const filePath = `${prefix}${fileRef.name}`;

        // Create the AWS:S3 object.
        // Feel free to change the storage class from, see the documentation,
        // `STANDARD_IA` is the best deal for low access files.
        // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
        // Body is the file stream we are sending to AWS
        s3.putObject({
            // ServerSideEncryption: 'AES256', // Optional
            StorageClass: 'STANDARD',
            Bucket: bucket,
            Key: filePath,
            Body: fs.createReadStream(vRef.path),
            ContentType: vRef.type,
        }, (error) => {
            bound(() => {
                if (error) {
                    console.error(error);
                } else {
                    // Update FilesCollection with link to the file at AWS
                    const upd = { $set: {} };
                    upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;

                    this.collection.update({
                        _id: fileRef._id
                    }, upd, (updError) => {
                        if (updError) {
                            console.error(updError);
                        } else {
                            // Unlink original files from FS after successful upload to AWS:S3
                            this.unlink(this.collection.findOne(fileRef._id), version);
                        }
                    });
                }
            });
        });
    });
}