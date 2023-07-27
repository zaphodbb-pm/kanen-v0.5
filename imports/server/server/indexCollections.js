/**
 * Creates db indexes for MongoDb collections.
 *
 * @module indexCollections
 * @memberOf Server:
 * @locus Server
 *
 */

import {
    Articles,
    Recipes,
    CookingNow,
    TestKitchen,
    Magazines,
    Editions,
    Books,
    Favourites,
    Notes,
    News,
} from "./Collections/collectionDefs";

//** create any indexes for larger collections to speed up searching
Articles.createIndex({articleId: 1, recipeId: 1});
Recipes.createIndex({recipeId: 1, articleId: 1});
CookingNow.createIndex({cookNowId: 1});
TestKitchen.createIndex({testKitchenId: 1});
Magazines.createIndex({magazineId: 1});
Editions.createIndex({editionId: 1});
Books.createIndex({name: 1});
News.createIndex({author: 1});

Favourites.createIndex({author: 1, username: 1});
Notes.createIndex({recipeId: 1, author: 1, username: 1 });
