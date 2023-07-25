/**
 * Collection definitions
 *
 * @name collectionDefs
 * @module
 * @memberOf Client:
 * @memberOf Server:
 * @locus Anywhere
 *
 * @property {Object} Articles
 * @property {Object} Recipes
 * @property {Object} CookingNow
 * @property {Object} TestKitchen
 * @property {Object} Magazine
 * @property {Object} Edition
 * @property {Object} News
 *
 * @property {Object} Starter
 * @property {Object} Learn
 *
 * @property {Object} SysConfig
 *
 *
 * @property {Object} allSystemCollections
 * @property {Object} allUserCollections
 */


import {Mongo} from "meteor/mongo";

import {Images, Thumbnails} from "./collectionsImages-s3";

export const Articles = new Mongo.Collection("articles");           // Main magazine articles
export const Recipes = new Mongo.Collection("recipes");             // Main magazine recipes
export const CookingNow = new Mongo.Collection("cookingNow");       // Short items
export const TestKitchen = new Mongo.Collection("testKitchen");     // Magazine Test Kitchen items
export const Magazines = new Mongo.Collection("magazines");         // Magazine overviews
export const Editions = new Mongo.Collection("editions");           // Editions overviews
export const Books = new Mongo.Collection("books");                 // Suggested books

export const News = new Mongo.Collection("news");                   // site news



//** system info
export const SysConfig = new Mongo.Collection("sysConfig");              // contains one document for configuring rating parameters


//** client accessible data
export const Favourites = new Mongo.Collection("favourites");           // User favourite recipes / menus
export const Notes = new Mongo.Collection("notes");                     // User notes per recipe

//** build collections object to replace dburles:mongo-collection-instances type lookups
export const allUserCollections = {
    "articles": Articles,
    "recipes": Recipes,
    "cookingNow": CookingNow,
    "testKitchen": TestKitchen,
    "magazines": Magazines,
    "editions": Editions,
    "books": Books,
    "favourites": Favourites,
    "notes": Notes,
    "news": News,
    "images": Images,
    "thumbnails": Thumbnails
}

export const allSystemCollections = {
    "sysConfig": SysConfig,
}

export const allCollections = {
    "articles": Articles,
    "recipes": Recipes,
    "cookingNow": CookingNow,
    "testKitchen": TestKitchen,
    "magazines": Magazines,
    "editions": Editions,
    "books": Books,
    "favourites": Favourites,
    "notes": Notes,
    "news": News,
    "images": Images,
    "thumbnails": Thumbnails,

    "sysConfig": SysConfig,
    "users": Meteor.users
}