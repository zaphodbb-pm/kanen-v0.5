import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'
import {Favourites, Notes} from "../Collections/collectionDefs";

Meteor.methods({

    /**
     * Meteor method to create a new receipeBox record for a subscriber.
     *
     * @function createRecipeBox
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     *
     */

    createRecipeBox: function (){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, text: `User is not logged in.`};
        }

        const created = Favourites.insert({
            author: me._id,
            username: me.username,
            authorName: me.username,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            tenantId: me["tenantId"],

            name: "general",
            description: "General menu to receive any of your recipe selections if no other menu exists.",
            recipes: []
        });

        const record = Favourites.findOne({author: me._id});

        if(created){
            return {status: 200, _id: me._id, records: record,  text: `User ${me.username} Favourites record was created.`};
        }else{
            return {status: 500, _id: me._id, records: [], text: `User ${me.username} Favourites record failed to be created.`};
        }
    },


    /**
     * Meteor method to retrieve a subscriber's set of menus.
     *
     * @function getMenuList
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     */

    getMenuList: function (){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, menus: [], text: `User is not logged in.`};
        }

        let menus  = Favourites.find({author: me._id}, {fields: {name: 1}, sort: {name: 1}}).fetch();

        if(menus.length < 1){
            const result = Meteor.call("createRecipeBox");
            menus = result.records;
        }

        return menus;
    },




    /**
     * Meteor method to copy a recipe from one menu to a selected list of other menus.
     *
     * @function copyRecipeItem
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {Array} docIds
     * @param {Object} recipe
     * @param {Number} recipe.row
     * @param {String} recipe.recipeId
     *
     * @returns {Object} - status return;
     */

    copyRecipeItem: function (docIds, recipe){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, record: undefined, text: `User is not logged in.`};
        }

        Favourites.update(
            { author: me._id, _id:{$in: docIds }, "recipes.recipeId": {$ne: recipe.recipeId } },
            {
                $set: {updatedAt: Date.now()},
                $push: { recipes: recipe }
            },
            {multi: true}
        );

        return {status: 200, text: `${docIds.join(", ")} updated` };
    },


    /**
     * Meteor method to remove a recipe from a menu.
     *
     * @function removeRecipeItem
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @param {String} docId
     * @param {String} recipeId
     *
     *
     * @returns {Object} - status return;
     */

    removeRecipeItem: function (docId, recipeId){
        check(docId, String);
        check(recipeId, String);

        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, record: undefined, text: `User is not logged in.`};
        }

        let test = Favourites.update(
            { author: me._id, _id: docId },
            {
                $set: {updatedAt: Date.now()},
                $pull: { recipes: { "recipeId": recipeId } }
            }
        );

        return {status: 200, record: test, text: `Removed Favourites recipe.`}
    },





    /**
     * Meteor method to retrieve a subscriber note attached to a recipe.
     *
     * @function getNote
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     */

    getNote: function (recipeId){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, menus: [], text: `User is not logged in.`};
        }

        return Notes.findOne({recipeId: recipeId, author: me._id});
    },


    /**
     * Meteor method to create a new subscriber note attached to a recipe.
     *
     * @function addNewNote
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     *
     */


    /*
    addNewNote: function (doc){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, text: `User is not logged in.`};
        }

        const owner = {
            author: me._id,
            username: me.username,
            authorName: me.username,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            tenantId: me["tenantId"]
            }

        const created = Notes.insert(Object.assign(owner, doc));

        const record = Notes.findOne({author: me._id});

        if(created){
            return {status: 200, _id: me._id, records: record,  text: `User ${me.username} Favourites record was created.`};
        }else{
            return {status: 500, _id: me._id, records: [], text: `User ${me.username} Favourites record failed to be created.`};
        }
    },

     */

    /**
     * Meteor method to update subscriber note attached to a recipe.
     *
     * @function updateNote
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     *
     */

    updateNote: function (noteId, doc){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, record: undefined, text: `User is not logged in.`};
        }

        const owner = {
            author: me._id,
            username: me.username,
            authorName: me.username,
            updatedAt: Date.now(),
            tenantId: me["tenantId"]
        }

        let document = Object.assign({}, doc, owner);

        let test = Notes.upsert(
            { _id: noteId, author: me._id  },
            {$set: document}
        );

        return {status: 200, record: test, text: `Upserted Note.`}
    },

    /**
     * Meteor method to remove a subscriber note attached to a recipe.
     *
     * @function updateNote
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - status return;
     *
     */

    removeNote: function (docId){
        const me = Meteor.user();

        if(!me){
            return {status: 500, _id: null, record: undefined, text: `User is not logged in.`};
        }

        let test = Notes.remove({ author: me._id, _id: docId });

        return {status: 200, record: test, text: `Removed Note from recipe.`}
    },

});
