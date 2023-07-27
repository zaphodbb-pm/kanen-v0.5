/**
 * @summary Build MongoDb object id
 *
 * @memberOf Client:
 * @memberOf Server:
 * @function createObjectId
 * @locus Server
 *
 * @return {Object} mongodbId
 *
 */

import { MongoInternals } from 'meteor/mongo';

// @ts-ignore
export const createObjectId = ({ gridFsFileId }) => new MongoInternals.NpmModule.ObjectID(gridFsFileId);
