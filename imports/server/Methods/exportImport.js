import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';

import {allCollections} from "../../both/collectionDefs";
import {verifyRole} from "../Functions/verifyRole";


Meteor.methods({

    /**
     * Sends documents as JSON from a collection.
     *
     * @function exportJSON
     * @memberOf SerMain:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} query
     * @return {Object} - {{records: number, size: number, data: string}}
     */


    exportJSON: function(coll, query) {
        check(coll, String);
        check(query, Object);

        if(query){
            check(query, Object);
        }else{
            query = {};
        }

        if(Meteor.userId()){                            // check if user is logged in
            const collection = allCollections[coll];
            let docs = [];

            if( coll === 'users' ){
                docs = Meteor.users.find( query ).fetch();
            }else{
                docs = collection.find( query ).fetch();

                //docs = Mongo.Collection.get(coll).find( query ).fetch();
            }

            let jsonDocs = JSON.stringify( docs );
            return { records: docs.length, size: jsonDocs.length, data: jsonDocs };
        }
    },

    /**
     * Imports documents as JSON from a browser.
     *
     * @function importJSON
     * @memberOf ServerMain:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object[]} doc
     * @param {String} doc[]._id
     * @return {string}
     */

    importJSON: function (coll, doc) {
        check(coll, String);
        check(doc, Array);

        if(Meteor.userId()){                            // check if user is logged in
            const collection = allCollections[coll];

            let exists = true;                          // default value to stop insertion

            doc.forEach( (el) => {
                exists = !!collection.findOne( {_id: el._id} );
                //exists = !!Mongo.Collection.get(coll).findOne( {_id: el._id} );

                if( !exists ){
                    if( coll === 'users' ){
                        Meteor.users.insert(el);
                    }else{
                        collection.insert(el);
                        //Mongo.Collection.get(coll).insert(el);
                    }
                }
            });

            return "Any new documents have been added to " +  coll + " by importJSON";
        }
    },


    /**
     * Removes all documents from a collection.
     *
     * @function importBulkDataRemove
     * @memberOf Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     *
     * @return {Object} - {status, message, coll, method}
     */
    importBulkDataRemove: function (coll ) {
        check(coll, String);

        //* make sure only authorized people can flush out a collection
        if(Meteor.userId() && verifyRole(Meteor.userId(), "administrator") ){                            // check if user is logged in

            const collection = allCollections[coll];
            collection.remove({});      // flush collection before loading new docs

            //Mongo.Collection.get(coll).remove({});      // flush collection before loading new docs
            return {
                status: 200,
                message: "Removed all docs",
                coll: coll,
                method: "importBulkDataRemove"
            }
        }else{
            return {
                status: 500,
                message: "You are not authorized for this activity",
                coll: coll,
                method: "importBulkDataRemove"
            }
        }
    },


    /**
     * Inserts all documents from a file into a collection.
     *
     * @function importBulkData
     * @memberOf Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     *
     * @return {Object} - {status, message, coll, method}
     */
    importBulkData: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        if(Meteor.userId() && verifyRole(Meteor.userId(), "administrator") ){                            // check if user is logged in
            const collection = allCollections[coll];

            let count = 0;

            if (Array.isArray(doc)) {
                count = doc.length;
                doc.forEach(function (item) {
                    collection.insert(item);

                    //Mongo.Collection.get(coll).insert(item);
                })
            } else {
                count = 1;
                collection.insert(doc);
                //Mongo.Collection.get(coll).insert(doc);
            }

            return {
                status: 200,
                message: "New documents have been added",
                coll: coll,
                count: count,
                method: "importBulkData"
            }

        }else{
            return {
                status: 500,
                message: "Insertion failed",
                coll: coll,
                count: 0,
                method: "importBulkData"
            }
        }
    }
});
