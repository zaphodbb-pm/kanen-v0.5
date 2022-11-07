/**
 * Configuration for Starter page components.
 *
 * @memberOf Pages:starter
 * @function starter_config
 * @locus Client
 *
 * @returns {Object}
 */


import grid from './starter_grid.svelte'

export const pageConfig =  {

    components: {

        gridMode: {
            field: "gridMode",
            fieldType: "switch",
            optional: true,

            css: "",
            attributes: {},
            params: {},
            defaultValue: false,
        },
    },

    form: {
        coll:       "starter",          // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-tertiary",      // colour header text and background

        hasGroups:  false,               // allows fields to be grouped onto the same row
        hasTabs:    false,               // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "starter",          // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: grid,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};