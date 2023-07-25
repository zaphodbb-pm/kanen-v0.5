/**
 * @summary FS Collection hook to handle downloading image file.
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createInterceptDownload
 * @locus Server
 *
 * @return {Boolean}
 *
 */

import { createObjectId } from './createObjectId';

export const createInterceptDownload = bucket =>
    function interceptDownload (http, file, versionName) {
        const { gridFsFileId } = file.versions[ versionName ].meta || {};
        if (gridFsFileId) {
            // opens the download stream using a given gfs id
            // see: http://mongodb.github.io/node-mongodb-native/3.6/api/GridFSBucket.html#openDownloadStream
            const gfsId = createObjectId({ gridFsFileId });
            const readStream = bucket.openDownloadStream(gfsId);

            readStream.on('data', (data) => {
                http.response.write(data);
            });

            readStream.on('end', () => {
                http.response.end('end');
            });

            readStream.on('error', () => {
                // not found probably
                // eslint-disable-next-line no-param-reassign
                http.response.statusCode = 404;
                http.response.end('not found');
            });

            http.response.setHeader('Cache-Control', this.cacheControl);

            const dispositionName = "filename=\"" + (encodeURIComponent(file.name)) + "\"; filename=*UTF-8\"" + (encodeURIComponent(file.name)) + "\"; ";
            const dispositionEncoding = 'charset=utf-8';
            http.response.setHeader('Content-Disposition', dispositionName + dispositionEncoding);
        }
        return Boolean(gridFsFileId); // Serve file from either GridFS or FS if it wasn't uploaded yet
    }

