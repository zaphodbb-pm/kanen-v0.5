import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';

import {SysConfig, allCollections} from "../Collections/collectionDefs";

Meteor.methods({

    /**
     * Meteor method to query server directly tfor system wide information.
     *
     * @function getSysInfo
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - document
     */

    getSysInfo: function () {
        return SysConfig.findOne({});
    },

    /**
     * General client side system config info from database.
     *
     * @function clientSysConfig
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - client config information
     */

    clientSysConfig() {
        let sysConfig = SysConfig.findOne({});
        let sysDebug = null;
        let showWidgets = false;
        let confirmDelete = false;
        let storePrefix = ";"

        if(sysConfig){
            sysDebug = sysConfig.debugLevel && (sysConfig.debugLevel !== "") ? sysConfig.debugLevel : null;
            showWidgets = !!sysConfig.showWidgets;
            confirmDelete = !!sysConfig.confirmDelete;
            storePrefix = sysConfig.storePrefix ?? "";
        }

        return {
            confirmDelete: confirmDelete,
            sysDebug: sysDebug,
            showWidgets: showWidgets,
            storePrefix: storePrefix
        };
    },


    /**
     * Meteor method to bulk remove documents by admin users.
     *
     * @function removeDocuments
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - collection to query
     * @param {Object} query - delete date range
     *
     * @returns {Object} - {status, text}
     */

    removeDocuments: function (coll, query) {
        check(coll, String);
        check(query, Object);

        const collection = allCollections[coll];

        /**
         * @type {Object}
         * @property {String} me.admin
         * @typescriptOnly
         */
        const me = Meteor.user();

        let number = 0;
        if (collection && me && me.admin) {              // check if admin user is logged in
            number = collection.remove(query);

            return {status: 200, count: number, text: `${number} documents have been removed on ${coll} by removeDocuments`};
        }else{
            // @ts-ignore
            global.showServerLogs("system.js:removeDocuments", {
                coll: coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, count: 0, text: "Invalid user"};
        }
    }
});
