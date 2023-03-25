import {Meteor} from "meteor/meteor";
import { check } from 'meteor/check';

import {allCollections} from "../../both/collectionDefs";
import {accessControl} from '../setupACL'
import {verifyRole} from '../Functions/verifyRole'
import {ownsDocument} from '../Functions/ownsDocument'
import {objectify} from '../Functions/objectify'



Meteor.methods({
    /**
     * General insert document into collection.
     *
     * @function insertDoc
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     * @param {String} doc.tenantId
     * @param {Number} doc.updatedAt
     *
     *
     * @return {Object}
     */
    insertDoc: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;

        if( verifyRole(me, acl.roles) && collection ) {
            /**
             * @type {Object}
             * @property {String} me.tenantId
             * @typescriptOnly
             */
            const me = Meteor.user();

            doc.tenantId = me && me.tenantId ? me.tenantId : "general";
            doc.updatedAt = Date.now();

            //* inject group name server side for security
            /**
             * @type {Object}
             * @property {String} me.admin
             * @typescriptOnly
             */

            if( me && me.profile && me.profile.group ){
                doc["group"] = me.profile.group;
            }else{
                doc["group"] = "";
            }

            const id = collection ? collection.insert(doc) : "";
            const name = doc["name"] ? `Doc: ${doc["name"]} - ` : "";

            if(id){
                return {status: 200, _id: id, text: `${name} ${id} has been added on ${coll} by insertDoc`};
            }else{
                return {status: 500, _id: id, text: `insertDoc at Server did not get a returned id value.`};
            }

        }else{
            // @ts-ignore
            global.showServerLogs("insertDoc", {
                coll: coll,
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, _id: "", text: "Invalid user; does not have store privileges."};
        }
    },

    /**
     * General document update into a collection.
     *
     * @function updateDoc
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} id
     * @param {Object} doc
     * @param {String} doc.tenantId
     * @param {Number} doc.updatedAt
     *
     * @return {Object}
     */
    updateDoc: function (coll, id, doc) {
        check(coll, String);
        check(id, String);
        check(doc, Object);

        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;
        const name = doc["name"] ? `Doc: ${doc["name"]} - ` : "";

        if( verifyRole(me, acl.roles) && collection ) {
            if(ownsDocument(me, doc)){     // check if user is doc owner before update
                doc.updatedAt = Date.now();
                collection.update({_id: id}, {$set: doc});
                return {status: 200, text:  `${name} ${id} has been updated on ${coll} by updateDoc`};
            }

            return {status: 404, text:  `Has not been updated on ${coll} by updateDoc.  User does not own document.`};
        }else{
            // @ts-ignore
            global.showServerLogs("updateDoc", {
                coll: coll,
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, text: "Invalid user; does not have store privileges."};
        }
    },


    /**
     * General document remover from a collection.
     *
     * @function removeDoc
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} docId
     *
     * @return {Object}
     */
    removeDoc: function (coll, docId) {
        check(coll, String);
        check(docId, String);

        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;

        if( verifyRole(me, acl.roles) && collection ) {
            const doc = collection.findOne({_id: docId});
            const name = doc["name"] ? `Doc: ${doc["name"]} - ` : "";

            if(ownsDocument(me, doc)){     // check if user is doc owner before delete
                collection.remove(doc._id);

                return {status: 200, _id: docId, text:  `${name} ${docId} has been removed from ${coll} by removeDoc`};
            }
            return {status: 404, _id: docId, text:  `User does not have permission to remove document.`};
        }else{
            // @ts-ignore
            global.showServerLogs("removeDoc", {
                coll: coll,
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, _id: "", text: "Invalid user; does not have store privileges."};
        }
    },

    /**
     * General document update a document field item.
     *
     * @function inputterUpdateItem
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     */

    updateDocField: function (coll, docId, field, value) {
        check(coll, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Number, Boolean, Object, Array) );

        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;

        if( verifyRole(me, acl.roles) && collection) {
            const updatedAt = Date.now();
            const setter = Object.assign({updatedAt: updatedAt}, objectify(field, value));

            collection.update({_id: docId}, {$set: setter });

            return {status: 200, _id: docId, text: `${docId} has been updated on ${coll} by updateDocField`};
        }else{
            // @ts-ignore
            global.showServerLogs("updateDocField", {
                coll: coll,
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, _id: "", text: "Invalid user; does not have store privileges."};
        }
    },

    /**
     * General document item as array updates.
     *
     * @function updateDocArray
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} operation
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     *
     * @notes
     *      As per MongoDb documentation, operations types are:
     *          "addToSet"
     *          "pop" or "shift" (ie "shift is "pop" with -1)
     *          "push"
     *          "pull"
     *          "pullAll"
     */

    updateDocArray: function (coll, operation,  docId, field, value) {
        check(coll, String);
        check(operation, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Array) );

        const me = Meteor.user();
        const acl = accessControl[coll];
        const collection = acl?.coll ? allCollections[acl.coll] : undefined;

        if( verifyRole(me, acl.roles) && collection) {
            let updatedAt = Date.now();
            let ops = null;

            switch(true){
                case operation === "addToSet":
                    if(Array.isArray(value) ){
                        ops = {
                            $addToSet: objectify(field, {$each: value} ),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case (operation === "shift") || (operation === "pop"):
                    let remove = operation === "shift" ? -1 : 1;
                    ops = {
                        $pop: objectify(field, remove),
                        $set: {updatedAt: updatedAt},
                    };
                    break;

                case operation === "push":
                    if(Array.isArray(value) ){
                        ops = {
                            $push: objectify(field, {$each: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $push: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pull":
                    if(Array.isArray(value) ){
                        ops = {
                            $pull: objectify(field, {$in: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pullAll":
                    if(Array.isArray(value) ){
                        ops = {
                            $pullAll: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;
            }

            if(ops){
                const test = collection.update({_id: docId}, ops);

                if(test){
                    return {
                        status: 200,
                        id: docId,
                        text: coll + " has been updated by InputterUpdateArray",
                        value: value
                    };
                }else{
                    return {
                        status: 404,
                        id: docId,
                        text: coll + " has no matching documents",
                        value: value
                    };
                }

            }else{
                return {
                    status: 400,
                    id: docId,
                    text: "Invalid value or field",
                    value: value
                }
            }
        } else {
            // @ts-ignore
            global.showServerLogs("updateDocArray", {
                coll: coll,
                acl: acl?.coll,
                text:"No access or collection does not exist."
            }, true);

            return {status: 400, id: docId, text: "Invalid value or field", value: value}
        }
    }

});
