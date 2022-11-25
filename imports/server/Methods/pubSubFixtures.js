import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

import {accessControl} from '../setupACL';
import {allCollections} from "../../both/collectionDefs";
import {verifyRole} from '../Functions/verifyRole';


Meteor.methods({

    /**
     * Special Pub Sub fixture to upload an initial array of documents.
     *
     * @function bulkLoadDocs
     * @memberOf ServerMain:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object[]} arr
     * @param {String} arr[]._id
     * @param {String} arr[].author
     * @param {String} arr[].tenantId
     * @param {Number} arr[].updatedAt
     *
     * @return {Object} - {status, text}
     */


    bulkLoadDocs: function (coll, arr) {
        check(coll, String);
        check(arr, Array);

        let acl = accessControl[coll];
        const collection = allCollections[acl.coll];

        /**
         *
         * @type {Object} me
         * @property {String} me._id
         * @property {String} me.tenantId
         */
        const me = Meteor.user();

        if( verifyRole(me, acl.roles) ) {
            let len = arr.length;

            if(len > 0){
                collection.remove({author: me._id});      // flush existing records

                //Mongo.Collection.get(acl.coll).remove({author: Meteor.user()._id});      // flush existing records


                arr.forEach( (doc) => {
                    /**
                     * @type {Object} doc
                     * @property {String} doc._id
                     * @property {String} doc.author
                     */
                    delete doc._id;

                    doc.author = me._id;
                    doc.tenantId = me && me.tenantId ? me.tenantId : "general";
                    doc.updatedAt = Date.now();

                    collection.insert(doc);
                    //Mongo.Collection.get(acl.coll).insert(doc);
                });

                return {status: 200,  len: len, text: `${len} documents have been added on ${coll} by bulkLoadDocs`};

            }else{
                return {status: 404,  len: len, text: `Warning:  NO documents have been added on ${coll} by bulkLoadDocs`};
            }



        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * Special Pub Sub fixture to update an array of documents.
     *
     * @function updateRealTimeDoc
     * @memberOf ServerMain:Methods:
     *
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object[]} docs
     * @param {*} docs[].value
     * @param {String} docs[].name
     *
     * @return {Object} - status
     */


    updateRealTimeDoc: function (coll, docs) {
        check(coll, String);
        check(docs, Array);

        /**
         *
         * @type {Object} me
         * @property {String} me._id
         * @property {String} me.tenantId
         */
        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = allCollections[acl.coll];

        if( verifyRole(me, acl.roles) ) {
            let len = docs.length;

            docs.forEach( (doc) => {
                let update = {
                    tenantId: me && me.tenantId ? me.tenantId : "general",
                    updatedAt: Date.now(),
                    value: doc.value
                }

                collection.update({author: Meteor.user()._id, name: doc.name}, {$set: update});

                //Mongo.Collection.get(acl.coll).update({author: Meteor.user()._id, name: doc.name}, {$set: update});
            });

            return {status: 200,  len: len, text: `${len} documents have been updated on ${coll} by updateRealTimeDoc`};

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    }
});
