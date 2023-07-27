import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';
import {allCollections} from "../Collections/collectionDefs";


Meteor.methods({

    /**
     * Sends documents as JSON from a collection.
     *
     * @function exportJSON
     * @memberOf Server:Methods:
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

        const me = Meteor.user();
        const admin = me && ( me["admin"] || me["role"]._id === "administrator");

        if(admin){       // check if administrator user is logged in
            const collection = allCollections[coll];
            let docs;

            if( coll === 'users' ){
                docs = Meteor.users.find( query ).fetch();
            }else{
                docs = collection.find( query ).fetch();
            }

            let jsonDocs = JSON.stringify( docs );
            return { records: docs.length, size: jsonDocs.length, data: jsonDocs };
        }
    },

    /**
     * Imports documents as JSON from a browser.
     *
     * @function importJSON
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object[]} doc
     * @param {String} doc[]._id
     * @param {String} doc[].author
     * @param {String} doc[].authorName
     * @param {String} doc[].authorFullName
     * @return {string}
     *
     */

    importJSON: function (coll, doc) {
        check(coll, String);
        check(doc, Array);

        const me = Meteor.user();
        const admin = me && ( me["admin"] || me["role"]._id === "administrator");

        if(admin){       // check if administrator user is logged in
            const collection = allCollections[coll];

            let exists = true;                              // default value to stop insertion
            doc.forEach( (el) => {
                exists = !!collection.findOne( {_id: el._id} );

                if( !exists ){
                    if( coll === 'users' ){
                        Meteor.users.insert(el);
                    }else{
                        el.author = me._id;
                        el.authorName = me["authorName"] ?? me.username ?? "n/a";
                        el.authorFullName = me["authorFullName"] ?? me.username ?? "n/a";
                        el["updatedAt"] = Date.now();

                        collection.insert(el);
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
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     *
     * @return {Object} - {status, message, coll, method}
     */
    importBulkDataRemove: function (coll ) {
        check(coll, String);

        const me = Meteor.user();
        const admin = me && ( me["admin"] || me["role"]._id === "administrator");

        //* make sure only authorized people can flush out a collection
        if(admin){

            const collection = allCollections[coll];
            collection.remove({});      // flush collection before loading new docs
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
     * @memberOf Server:Methods:
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

        const me = Meteor.user();
        const admin = me && ( me["admin"] || me["role"]._id === "administrator");

        if(admin ){
            const collection = allCollections[coll];

            let count;

            if (Array.isArray(doc)) {
                count = doc.length;
                doc.forEach(function (item) {
                    collection.insert(item);
                })
            } else {
                count = 1;
                collection.insert(doc);
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
