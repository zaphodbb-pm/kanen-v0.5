/**
 * @summary GridFS bucket creator
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createBucket
 * @locus Server
 *
 * @return {Object} mongodbId
 *
 */



// @ts-ignore
import { MongoInternals } from 'meteor/mongo';


export const createBucket = (bucketName) => {
    const options = bucketName ? {bucketName} : (void 0);

    return new MongoInternals.NpmModules.mongodb.module.GridFSBucket(MongoInternals.defaultRemoteCollectionDriver().mongo.db, options);
}