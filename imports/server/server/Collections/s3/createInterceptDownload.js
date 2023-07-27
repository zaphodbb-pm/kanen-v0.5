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

// @ts-ignore
import stream from "stream";

export const createInterceptDownload = (s3, bucket) =>
    function interceptDownload(http, fileRef, version) {
        let path;

        if (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipePath) {
            path = fileRef.versions[version].meta.pipePath;
        }

        if (path) {
            // If file is successfully moved to AWS:S3
            // We will pipe request to AWS:S3
            // So, original link will stay always secure

            // To force ?play and ?download parameters
            // and to keep original file name, content-type,
            // content-disposition, chunked "streaming" and cache-control
            // we're using low-level .serve() method
            const opts = {
                Bucket: bucket,
                Key: path
            };

            if (http.request.headers.range) {
                const vRef  = fileRef.versions[version];
                let range = http.request.headers.range.slice();

                const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
                const start = parseInt(array[1]);
                let end     = parseInt(array[2]);
                if (isNaN(end)) {
                    // Request data from AWS:S3 by small chunks
                    end       = (start + this.chunkSize) - 1;
                    if (end >= vRef.size) {
                        end     = vRef.size - 1;
                    }
                }
                opts.Range   = `bytes=${start}-${end}`;
                http.request.headers.range = `bytes=${start}-${end}`;
            }

            const fileColl = this;
            s3.getObject(opts, function (error) {
                if (error) {
                    console.error(error);
                    if (!http.response.finished) {
                        http.response.end();
                    }
                } else {
                    if (http.request.headers.range && this.httpResponse.headers['content-range']) {
                        // Set proper range header in according to what is returned from AWS:S3
                        http.request.headers.range = this.httpResponse.headers['content-range'].split('/')[0].replace('bytes ', 'bytes=');
                    }

                    const dataStream = new stream.PassThrough();
                    fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream);
                    dataStream.end(this.data.Body);
                }
            });

            return true;
        }

        return false;
    }