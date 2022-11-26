/**
 * Creates db indexes for MongoDb collections.
 *
 * @module indexCollections
 * @memberOf ServerMain:
 * @locus Server
 *
 */

import {Learn, LogsSensor, LogsSystem, LogsUser, Notifications, RealTime, Starter} from "../both/collectionDefs";

//** create any indexes for larger collections to speed up searching
    //*** system collections
    LogsSystem.createIndex({updatedAt: 1});
    LogsUser.createIndex({author: 1, updatedAt: 1});
    LogsSensor.createIndex({updatedAt: 1});

    //*** user collections
    Learn.createIndex({author: 1});
    Notifications.createIndex({author: 1});
    Starter.createIndex({geoLocation: "2dsphere", tenantId: 1, author: 1});  // "geoLocation needs to be first field!
    RealTime.createIndex({author: 1, name: 1, updatedAt: 1});
