/**
 * Configuration for images page Components.
 *
 * @name images_config
 * @constant {Object}
 * @memberOf Pages:images
 * @locus Client
 *
 * @property {Object} pageConfig - {components, form, list}
 *
 */


export const pageConfig =  {

    form: {
        coll:       "images",          // target collection to send submit to
        css:        "",
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-tertiary",      // colour header text and background
        formType:   "has-form-shadow",   // modifier for formHolder to add features

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    false,               // has tabbed fields in form
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      false,               // allow user to clone current document in edit
    },

    list: {
        coll:       "images",          // collection name to list
        css:        "",
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