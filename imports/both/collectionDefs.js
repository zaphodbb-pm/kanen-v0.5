/**
 * Collection definitions
 *
 * @name collectionDefs
 * @module
 * @memberOf ClientMain:
 * @memberOf ServerMain:
 * @locus Anywhere
 *
 * @property {Object} SysConfig
 * @property {Object} LogsSystem
 * @property {Object} LogsUsers
 * @property {Object} LogsSensors
 * @property {Object} Starter
 * @property {Object} Learn
 * @property {Object} Notifications
 * @property {Object} RealTime
 *
 * @property {Object} allSystemCollections
 * @property {Object} allUserCollections
 */


import {Mongo} from "meteor/mongo";

//** system info
export const SysConfig = new Mongo.Collection("sysConfig");              // contains one document for configuring rating parameters
export const LogsSystem = new Mongo.Collection("logsSystem");            // Systems events such as heartbeat
export const LogsUser = new Mongo.Collection("logsUsers");              // Tracks user actions such as login / logout
export const LogsSensor = new Mongo.Collection("logsSensors");          // Tracks any real time sensor inputs


//** client accessible data
export const Starter = new Mongo.Collection('starter');                  // sample starter coll; schema shows all field types
export const Learn = new Mongo.Collection('learn');                      // extra content pages as part of a simple CMS
export const Notifications = new Mongo.Collection('notifications');      // user generated activity that drives notifications (ie invites)
export const RealTime = new Mongo.Collection('realTime');                // example of reactive collection tracking

//** build collections object to replace dburles:mongo-collection-instances type lookups
export const allUserCollections = {
    "starter": Starter,
    "learn": Learn,
    "notifications": Notifications,
    "realTime": RealTime
}

export const allSystemCollections = {
    "sysConfig": SysConfig,
    "logsSystem": LogsSystem,
    "logsUser": LogsUser,
    "logsSensor": LogsSensor
}

export const allCollections = {
    "sysConfig": SysConfig,
    "logsSystem": LogsSystem,
    "logsUser": LogsUser,
    "logsSensor": LogsSensor,

    "starter": Starter,
    "learn": Learn,
    "notifications": Notifications,
    "realTime": RealTime,

    "users": Meteor.users
}




