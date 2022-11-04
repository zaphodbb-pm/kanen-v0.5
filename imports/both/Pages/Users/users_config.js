/**
 * Configuration for Users page components.
 *
 * @memberOf Pages:users
 * @function users_config
 * @locus Client
 *
 * @returns {Object}
 */


export const pageConfig =  {

    form: {
        coll:       "users",            // target collection to send submit to
        showHdr:    true,               // show card header and title if true

        hasGroups:  false,               // allows fields to be grouped onto the same row
        hasTabs:    false,               // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "users",            // collection name to list
        showHdr:    true,               // show card header and title if true

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: false,              // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: null,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
