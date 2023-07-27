/**
 * Configuration for EditionsSearch page Components.
 *
 * @name editionsSearch_config
 * @constant {Object}
 * @memberOf Pages:editionsSearch
 * @locus Client
 *
 * @property {Object} pageConfig - {components, form, list}
 *
 */


import grid from './editionsSearch_grid.svelte';
export const pageConfig =  {

    list: {
        coll:       "editionsSearch",  // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: false,              // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "grid",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: grid,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
