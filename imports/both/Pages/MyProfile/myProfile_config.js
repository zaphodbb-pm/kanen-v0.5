/**
 * Configuration for MyProfile components (optional).
 *
 * @memberOf Pages:myProfile
 * @function myProfile_config
 * @locus Client
 *
 * @returns {Object}
 */

export const pageConfig =  {

    form: {
        coll:       "myProfile",        // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    "", // colour header text and background

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    true,               // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      false,               // allow user to clone current document in edit
    }
};
