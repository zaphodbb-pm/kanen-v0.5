/**
 * @summary FS Collection hook to handle uploaded image file for S3 type storage.
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createOnAfterRemove
 * @locus Server
 *
 * @return nothing
 *
 */

export const createOnAfterRemove = (bound, s3, bucket) =>
    function onAfterRemove (files) {
        files.forEach(file => {
            Object.keys(file.versions).forEach(versionName => {
                let vRef = file.versions[versionName];

                if (vRef && vRef.meta && vRef.meta.pipePath) {
                    // Remove the object from AWS:S3 first, then we will call the original FilesCollection remove
                    s3.deleteObject({
                        Bucket: bucket,
                        Key: vRef.meta.pipePath,
                    }, (error) => {
                        bound(() => {
                            if (error) {
                                console.error(error);
                            }
                        });
                    });
                }
            });

        });
    }