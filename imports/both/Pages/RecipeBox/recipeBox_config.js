/**
 * Configuration for recipeBox page Components.
 *
 * @name recipeBox_config
 * @constant {Object}
 * @memberOf Pages:recipeBox
 * @locus Client
 *
 * @property {Object} pageConfig - {components, form, list}
 *
 */

import grid from './recipeBox_grid.svelte';

export const pageConfig =  {

    form: {
        coll:       "recipeBox",        // target collection to send submit to
        css:        "",
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-tertiary",      // colour header text and background
        formType:   "has-form-shadow",  // modifier for formHolder to add features

        hasGroups:  false,              // allows fields to be grouped onto the same row
        hasTabs:    false,              // has tabbed fields in form
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: true,               // support for form overlaying the list during edit operation
        clone:      false,              // allow user to clone current document in edit
    },

    list: {
        coll:       "recipeBox",          // collection name to list
        css:        "",
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: false,              // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: true,               // support for form overlaying the list during edit operation

        display:    "grid",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: grid,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
