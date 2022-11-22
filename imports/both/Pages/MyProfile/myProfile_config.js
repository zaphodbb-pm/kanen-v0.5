/**
 * Configuration for MyProfile Components (optional).
 *
 * @memberOf Pages:myProfile
 * @function myProfile_config
 * @locus Client
 *
 * @property {Object} pageConfig - {form}
 */

export const pageConfig =  {

    form: {
        coll:       "myProfile",        // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    "is-tertiary",      // colour header text and background
        formType:   "is-form-tabbed",   // modifier for formHolder to add features

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    true,               // has tabbed fields in form
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      false,               // allow user to clone current document in edit
    }
};
