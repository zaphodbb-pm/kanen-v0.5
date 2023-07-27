/**
 * Configuration for ArticlesSearch page Components.
 *
 * @name articlesSearch_config
 * @constant {Object}
 * @memberOf Pages:articlesSearch
 * @locus Client
 *
 * @property {Object} pageConfig - {list}
 *
 */

import grid from './articlesSearch_grid.svelte';

export const pageConfig =  {

    list: {
        coll:       "articlesSearch",   // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "grid",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: grid,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
