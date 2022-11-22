/**
 * Configuration for Starter page Components.
 *
 * @memberOf Pages:starter
 * @function starter_config
 * @locus Client
 *
 * @property {Object} pageConfig - {components, form, list}
 *
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
        formType:   "is-form-tabbed",   // modifier for formHolder to add features

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    true,               // has tabbed fields in form
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
