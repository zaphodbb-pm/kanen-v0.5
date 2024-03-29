//** user accounts are implicit in Meteor and are handled differently than collections
import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {check, Match} from 'meteor/check'

import {objectify} from '../Functions/objectify'
import {verifyRole} from '../Functions/verifyRole'
import {accessControl} from '../setupACL'


Meteor.methods({

    /**
     * External Login service support.
     *
     * @function getServiceConfiguration
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @return {Object}
     */

    getServiceConfiguration(service){
        // @ts-ignore
        return ServiceConfiguration.configurations.findOne({service: service});
    },


    /**
     * Insert a new user object.
     *
     * @function userMgmtInsert
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {Object} doc
     * @param {String} doc.username
     * @param {String} doc.emailMain
     * @param {String} doc.pwdMain
     * @param {String} doc.sortName
     * @param {String} doc.tenantId
     * @param {String} doc.active
     * @param {String} doc.credits
     * @param {String} doc.role
     * @param {Boolean} doc.admin
     * @param {String} doc.apiKey
     * @param {String} doc.groups
     * @param {Boolean} doc.groupMaster
     *
     *
     * @return {Object} - {status, text}
     */
    userMgmtInsert(doc) {
        check(doc, Object);

        //* updating user is administrator; then allow insert
        if (Meteor.user() && verifyRole(Meteor.user(), ["administrator"] )) {

            let test = Accounts.createUser({
                username: doc.username,
                email: doc.emailMain && doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                password: doc.pwdMain && doc.pwdMain !== "" ? doc.pwdMain : doc.username
            });

            let addins = {
                sortName: doc.sortName ? doc.sortName : doc.username.toLowerCase(),
                tenantId: doc.tenantId ? doc.tenantId : "general",
                active: doc.active ? doc.active : false,
                emailMain: doc.emailMain && doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                credits: doc.credits ? doc.credits : 0,

                role: doc.role ? doc.role : "",

                admin: doc.admin ? doc.admin : false,
                apiKey: doc.apiKey ? doc.apiKey : "",
                groups: doc.groups ? doc.groups : "",
                groupMaster: doc.groupMaster ? doc.groupMaster : false,

                author: test,
                authorName: doc.username,
                authorFullName: doc.username,

                profile: {},
                updatedAt: Date.now()
            };

            // @ts-ignore
            Meteor.users.update(test, {$set: addins}, function (err, res) {
                console.log("umi", err, res);
            });

            return {status: 200, _id: test, text: `${doc.username} has been added to users`};
       }
    },

    /**
     * Update a user's main info.
     *
     * @function userMgmtUpdate
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {string} userId
     * @param {Object} doc
     * @param {Object} doc.profile
     * @param {String} doc._id
     * @param {String} doc.username
     * @param {String} doc.pwdMain
     * @param {String} doc.emailMain
     * @param {String} doc.sortName
     * @param {String} doc.tenantId
     * @param {String} doc.active
     * @param {String} doc.credits
     * @param {String} doc.role
     * @param {Boolean} doc.admin
     * @param {String} doc.apiKey
     * @param {String} doc.groups
     * @param {Boolean} doc.groupMaster
     *
     * @return {Object} - {status, _id, text}
     */
    userMgmtUpdate(userId, doc) {
        check(userId, String);
        check(doc, Object);

        //* updating user is administrator; then allow update
        if (Meteor.user() && verifyRole(Meteor.user(), ["administrator"])) {     // check if updating user is administrator
            let user = Meteor.users.findOne({_id: userId});

            if (doc.username) {
                Accounts.setUsername(userId, doc.username);
            }

            if (doc.pwdMain) {
                Accounts.setPassword(userId, doc.pwdMain);
            }

            if (user.emails && user.emails[0] && user.emails[0].address) {        // check if email field exists
                if (doc.emailMain && doc.emailMain !== user.emails[0].address) {                   // skip if email has not been changed
                    Accounts.removeEmail(userId, user.emails[0].address);
                    Accounts.addEmail(userId, doc.emailMain, true);
                }
            }else{
                if(doc.emailMain){
                    Accounts.addEmail(userId, doc.emailMain, true);
                }
            }

            // @ts-ignore
            const sortName = user.sortName ?? "sortname";

            let addins = {
                sortName: doc.sortName ? doc.sortName : ( doc.username ? doc.username.toLowerCase() : sortName),
                emailMain: doc.emailMain && doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                tenantId: doc.tenantId ? doc.tenantId : "general",
                active: doc.active ? doc.active : false,
                credits: doc.credits ? doc.credits : 0,

                role: doc.role ? doc.role : "",
                admin: doc.admin ? doc.admin : false,
                apiKey: doc.apiKey ? doc.apiKey : "",
                groups: doc.groups ? doc.groups : "",
                groupMaster: doc.groupMaster ? doc.groupMaster : false,

                author: doc._id,
                authorName: doc.username,
                authorFullName: doc.username,

                profile: doc.profile,
                updatedAt: Date.now()
            };

            Meteor.users.update(userId, {$set: addins});
            return {status: 200, _id: user, text: `${doc.username} has been added to users`};
        } else {
            return {status: 400, _id: userId, text: `${doc.username} was not updated`};
        }
    },

    /**
     * Update a user's profile field value.
     *
     * @function userMgmtUpdateItem
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} item
     * @param {*} val
     * @return {Object} - {status, _id, text}
     */
    userMgmtUpdateItem(item, val) {
        check(item, String);
        check(val, Match.OneOf(String, Number, Object, Array) );

        let acl = accessControl["users"];

        if( Meteor.user() && verifyRole(Meteor.user(), acl.roles) ) {     // check if user is logged in
            Meteor.users.update({_id: Meteor.user()._id}, {$set: objectify(item, val)});
            return {status: 200, _id: Meteor.user()._id, text: `${item} has been updated`};
        }else{
            return {status: 400, _id: null, text: `User does not have access privileges; ${item} has NOT been updated`};
        }
    },

    /**
     * Remove an existing user object.
     *
     * @function userMgmtRemove
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} docId
     *
     * @return {Object} - {status, _id, text}
     */
    userMgmtRemove(docId) {
        check(docId, String);

        if (Meteor.user() && verifyRole(Meteor.user(), ["administrator"])) {    // check if updating user is administrator
            let doc = Meteor.users.findOne({_id: docId});
            Meteor.users.remove(doc._id);
            return {status: 200, _id: docId, text: `${doc.username} has been removed`};
        }
    },

    /**
     * Update a user's credit value
     *
     * @function userUpdateCredit
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {Number} price
     *
     * @return {Object} - {status, _id, text}
     */
    userUpdateCredit( price) {
        check(price, Number);

        if(this.userId){

            /**
             * @type {Object}
             * @typescriptOnly
             */
            const doc = Meteor.users.findOne({_id: this.userId});     // get user info
            if (doc && typeof doc.credits === "number") {
                let credit = doc.credits - Math.abs(price);                  // adjust and ensure that users cannot game the credits
                credit = credit > 0 ? credit : 0;

                Meteor.users.update({_id: this.userId}, {$set: {credits: credit}});
                return {status: 200, _id: this.userId, text: `User credits have been updated to ${credit}.`};
            } else {
                return {status: 400, _id: null, text: `User does not have access privileges; ${doc.name} has NOT been updated`};
            }
        }else{
            return {status: 400, _id: this.userId, text: `User does not exist or has no credit`};
        }
    },

    /**
     * Find a user's group members.
     *
     * @function getGroupMembers
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @return {Array} - [_id]
     */
    getGroupMembers(){
        if( !this.userId ){return [];}

        /**
         * @type {Array}
         * @typescriptOnly
         */
        let out = [ this.userId ];

        /**
         *
         * @type {Object}
         * @typescriptOnly
         */
        const mine = Meteor.users.findOne({_id: this.userId});

        //*** modify query to include documents from my group members
        if (mine.groups && (typeof mine.groups === "string") && mine.groups !== "") {

            let groups = (mine.groups).replace(/\s/g, '').split(",");       // remove all whites spaces and then create item array
            groups = groups.map( function(item){                // add regex strings to match on
                return new RegExp(item, "i");
            });

            let members = Meteor.users.find({groups: {$in: groups}}, {fields: {_id: 1}}).fetch();
            out = members.map( function(item){
                return item._id;
            });
        }

        return out;
    },

    /**
     * Get extra user fields based on user id.
     *
     * @function loadExtraFields
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @return {Object} - {tenantId, sortName, admin, active, apiKey, role, groups, groupMaster, credits, status}
     */
    loadExtraFields() {
        if (this.userId) {
            let extras = {
                tenantId: 1,
                sortName: 1,
                admin: 1,
                active: 1,
                apiKey: 1,
                role: 1,
                groups: 1,
                groupMaster: 1,
                credits: 1,
                status: 1,
            };

            return  Meteor.users.findOne({_id: this.userId}, {fields: extras});
        } else {
            return null;
        }
    }
});
