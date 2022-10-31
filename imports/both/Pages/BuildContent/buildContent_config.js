/**
 * Configuration for BuildContent page components.
 *
 * @memberof Pages:BuildContent
 * @function buildContent_page_config
 * @locus Client
 *
 * @returns {Object}
 */


export const pageConfig =  {

    form: {
        coll:       "buildContent",     // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    "", // colour header text and background

        hasGroups:  false,              // allows fields to be grouped onto the same row
        hasTabs:    false,              // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "buildContent",     // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    "", // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards

        target:     "/home",            // launch page for a click table item
    }
};
