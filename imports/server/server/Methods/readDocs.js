// import app main routines
import {Meteor} from "meteor/meteor";
import {Match} from 'meteor/check'
import {check} from 'meteor/check'

import {accessControl} from '../setupACL'
import {allCollections} from "../Collections/collectionDefs";

//import {Images, Thumbnails} from "../Collections/collectionsImages";
import {Images, Thumbnails} from "../Collections/collectionsImages-s3";

import {myDocuments} from '../Functions/myDocuments'
import {documents} from '../../both/systemGlobals'


Meteor.methods({

    /**
     * For list search bar, gets count of total number of user documents.
     *
     * @function countDocs
     * @memberOf Server:Methods:
     * @locus Server
     * @isMethod true
     *
     * @param {String} coll
     * @param {Object} query
     *
     * @return {Number}
     */

    countDocs: function (coll, query) {
        check(coll, String);
        check(query, Object);

        let q = query || {};
        let out = 0;

        if (Meteor.userId()) {                            // check if user is logged in
            const acl = accessControl[coll];
            const collection = acl?.coll ? allCollections[acl.coll] : undefined;

            if(acl && collection){
                switch (true) {
                    case coll === 'users':
                        out = Meteor.users.find(q).count();
                        break;

                    case coll === "recipeBox":
                        out = collection.find({author: Meteor.user()?._id}).count();
                        break;

                    default:
                        //*** adjust certain mappings to real collection
                        let access = myDocuments(q, Meteor.user(), acl.roles);

                        if(access && collection){
                            q = Object.assign( query, access );
                            out = collection.find(q).count();
                        }
                }
            } else {
                // @ts-ignore
                global.showServerLogs(coll, {
                        acl: acl?.coll,
                        text:"No access or collection does not exist."
                    }, true);
            }
        }

        return out;
    },



    /**
     * Meteor method to retrieve document from MongoDB.
     *
     * @function getCollData
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - name of collection to query
     * @param {String} type - type of operation to perform: 'list', 'allFields', 'oneAllFields'
     * @param {Object} filter - standard MongoDB query object
     * @param {Object} options - standard MongoDB option add-on
     *
     * @returns {Array|Object} Obj - returns results of MongoDB read operation
     *
     * @notes
     *  1. Adding a suffix of "_one" to type name uses "findOne" mongo method
     *  2. Adding a suffix of "_count" to type name uses "count" mongo method
     *
     */

    getCollData(coll, type, filter, options) {

        //* perform basic argument tests
        type = Match.test(type, String) ? type : "";
        filter = Match.test(filter, Object) ? filter : {};
        options = Match.test(options, Object) ? options : {limit: documents.LIMIT_MAX_SMALL};

        if (!(coll && Match.test(coll, String))) {
            return returnEmpty(type);
        }

        //* initialize working variables
        let docs = [];
        let query = {};
        let opts = {};

        //* get access control and roles information
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;

        if(acl && collection){
            let projection = type.replace("_one", "").replace("_count", "");
            let fields = acl[projection] ? {fields: acl[projection] } : {};

            //* build query object
            let access = myDocuments(filter, Meteor.user(), acl.roles);
            
            //* if access is blocked, return empty set
            if (!access) { return returnEmpty(type); }

            query = Object.assign( query, access, filter );
            opts = Object.assign(options, fields);

            switch(true){
                case type.includes("_count"):
                    docs = collection.find( query, opts ).count();
                    break;

                case coll === "images" && type.includes("_one"):
                    docs = Images.findOne(query, {fields: acl.schemaForm}).fetch()[0];
                    docs.image = {name: docs.name, src: docs.link};
                    break;

                case coll === "thumbnails" && type.includes("_one"):
                    docs = Thumbnails.findOne(query, {fields: acl.schemaForm}).fetch()[0];
                    docs.thumbnail = {name: docs.name, src: docs.link};
                    break;

                case coll === "recipeBox":
                    docs = collection.find({author: Meteor.user()?._id}).fetch();
                    break;

                case type.includes("_one"):
                    docs = collection.findOne( query, opts );
                    break;

                default:
                    docs = collection.find( query, opts ).fetch();
            }
        }else{
            // @ts-ignore
            global.showServerLogs(coll, {
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);
        }

        return docs;
    }
});


//* if access fails then return an empty result based on request type
function returnEmpty(type){
    if( type.includes("_one") ){ return {}; }
    if( type.includes("_count") ){ return 0; }

    return [];
}
