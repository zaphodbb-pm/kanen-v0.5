/**
 * Collection definitions
 *
 * @name collections
 * @module
 * @memberOf ClientMain
 * @memberOf ServerMain
 * @locus Anywhere
 *
 * @typedef global
 * @property {Object} SysConfig
 * @property {Object} LogsSystem
 * @property {Object} LogsUsers
 * @property {Object} LogsSensors
 * @property {Object} Starter
 * @property {Object} Learn
 * @property {Object} Notifications
 * @property {Object} RealTime
 *
 */


import {Mongo} from "meteor/mongo";


//** system info
global["SysConfig"] = new Mongo.Collection("sysConfig");              // contains one document for configuring rating parameters
global["LogsSystem"] = new Mongo.Collection("logsSystem");            // Systems events such as heartbeat
global["LogsUsers"] = new Mongo.Collection("logsUsers");              // Tracks user actions such as login / logout
global["LogsSensors"] = new Mongo.Collection("logsSensors");          // Tracks any real time sensor inputs


//** client accessible data
global["Starter"] = new Mongo.Collection('starter');                  // sample starter coll; schema shows all field types
global["Learn"] = new Mongo.Collection('learn');                      // extra content pages as part of a simple CMS
global["Notifications"] = new Mongo.Collection('notifications');      // user generated activity that drives notifications (ie invites)
global["RealTime"] = new Mongo.Collection('realTime');                // example of reactive collection tracking