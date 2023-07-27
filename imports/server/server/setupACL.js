/**
 * Server side setup of Access Control List for pages that try to store documents.
 *
 * @function setupACL
 * @memberOf Server:
 * @locus Server
 *
 * @property {Object} accessControl
 * @property {Object} accessControl.articles
 * @property {Object} accessControl.recipes
 * @property {Object} accessControl.cookingNow
 * @property {Object} accessControl.testKitchen
 * @property {Object} accessControl.magazines
 * @property {Object} accessControl.editions
 * @property {Object} accessControl.boooks
 *
 * @property {Object} accessControl.favourites
 * @property {Object} accessControl.notes
 * @property {Object} accessControl.images
 * @property {Object} accessControl.thumbnails
 * @property {Object} accessControl.news
 *
 * @property {Object} accessControl.articlesSearch
 * @property {Object} accessControl.recipesSearch
 * @property {Object} accessControl.cookingNowSearch
 * @property {Object} accessControl.testKitchenSearch
 * @property {Object} accessControl.magazinesSearch
 * @property {Object} accessControl.editionsSearch
 * @property {Object} accessControl.newsSearch
 *
 * @property {Object} accessControl.articlesShow
 * @property {Object} accessControl.recipesShow
 * @property {Object} accessControl.testKitchenShow
 * @property {Object} accessControl.recipeBox
 *
 * @property {Object} accessControl.users
 * @property {Object} accessControl.logsSystem
 * @property {Object} accessControl.notifications
 * @property {Object} accessControl.authors
 *
 * @returns {Object} accessControl
 */

let acl = {};

//* load client accessible collections
import myProfile from '../both/Pages/MyProfile/myProfile_access_control'

acl = Object.assign(acl, myProfile);

//* load content admin accessible collections
import articles from '../both/Pages/Articles/articles_access_control';
import recipes from '../both/Pages/Recipes/recipes_access_control';
import cookingNow from '../both/Pages/CookingNow/cookingNow_access_control';
import testKitchen from '../both/Pages/TestKitchen/testKitchen_access_control';
import magazines from '../both/Pages/Magazines/magazines_access_control';
import editions from '../both/Pages/Editions/editions_access_control';
import books from '../both/Pages/Books/books_access_control';
import favourites from '../both/Pages/Favourites/favourites_access_control';
import notes from '../both/Pages/Notes/notes_access_control';
import images from '../both/Pages/Images/images_access_control';
import thumbnails from '../both/Pages/Thumbnails/thumbnails_access_control';
import news from '../both/Pages/News/news_access_control';

acl = Object.assign(acl, articles, recipes, cookingNow,
    testKitchen, magazines, editions, books, favourites,
    notes, images, thumbnails, news);



//* add subscriber page views
import articlesSearch from '../both/Pages/ArticlesSearch/articlesSearch_access_control';
import recipesSearch from '../both/Pages/RecipesSearch/recipesSearch_access_control';
import cookingNowSearch from "../both/Pages/CookingNowSearch/cookingNowSearch_access_control";
import testKitchenSearch from "../both/Pages/TestKitchenSearch/testKitchenSearch_access_control";
import magazinesSearch from "../both/Pages/MagazinesSearch/magazinesSearch_access_control";
import editionsSearch from "../both/Pages/EditionsSearch/editionsSearch_access_control";
import newsSearch from "../both/Pages/NewsSearch/newsSearch_access_control";

acl = Object.assign(acl, articlesSearch, recipesSearch, cookingNowSearch, testKitchenSearch, magazinesSearch, editionsSearch, newsSearch);


//* add general client page views
import articlesShow from '../both/Pages/ArticlesShow/articlesShow_access_control';
import recipesShow from "../both/Pages/RecipesShow/recipesShow_access_control";
import testKitchenShow from "../both/Pages/TestKitchenShow/testKitchenShow_access_control";
import recipeBox from "../both/Pages/RecipeBox/recipeBox_access_control";
import editionsShow from '../both/Pages/EditionsShow/editionsShow_access_control';

acl = Object.assign(acl, articlesShow, recipesShow, testKitchenShow, recipeBox, editionsShow);

//* load sys admin accessible collections
import users from '../both/Pages/Users/users_access_control'
import sysConfig from '../both/Pages/SysConfig/sysConfig_access_control'

acl = Object.assign(acl, users, sysConfig);


//* load special collections
import {authors_acl} from './specialACL'

acl = Object.assign(acl, authors_acl);


export const accessControl = acl;
