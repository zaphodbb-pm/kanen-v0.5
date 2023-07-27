/**
 * Configuration for Articles page Components.
 *
 * @name articles_config
 * @constant {Object}
 * @memberOf Pages:articles
 * @locus Client
 *
 * @property {Object} pageConfig - {components, form, list}
 *
 */


export const pageConfig =  {

    form: {
        coll:       "articles",          // target collection to send submit to
        css:        "is-span-2",
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-tertiary",      // colour header text and background
        formType:   "has-form-shadow",   // modifier for formHolder to add features

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    false,               // has tabbed fields in form
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "articles",          // collection name to list
        css:        "is-span-1",
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-secondary",     // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: null,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
