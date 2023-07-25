/**
 * @summary FS Collection hook to handle uploaded image file.
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createOnAfterRemove
 * @locus Server
 *
 * @return nothing
 *
 */
import { createObjectId } from './createObjectId'

export const createOnAfterRemove = bucket =>
    function onAfterRemove (files) {
        files.forEach(file => {
            Object.keys(file.versions).forEach(versionName => {
                const gridFsFileId = (file.versions[ versionName ].meta || {}).gridFsFileId;
                if (gridFsFileId) {
                    const gfsId = createObjectId({ gridFsFileId });
                    bucket.delete(gfsId, err => {
                        if (err) console.error(err);
                    });
                }
            });
        });
    }