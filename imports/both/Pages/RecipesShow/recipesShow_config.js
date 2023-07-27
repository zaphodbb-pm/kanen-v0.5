/**
 * Configuration for RecipesShow page Components.
 *
 * @name recipesShow_config
 * @constant {Object}
 * @memberOf Pages:recipesShow
 * @locus Client
 *
 * @property {Object} pageConfig - {list}
 *
 */


export const pageConfig =  {

    list: {
        coll:       "recipesShow",   // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: false,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: null,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
