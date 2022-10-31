/**
 * Client side constants to set up the environment.
 * This file provides a single entry point to provide consistency across all pages, components and elements.
 *
 * @memberOf Setup:Client
 * @name systemGlobals
 * @locus Client
 *
 * @exports {Object} layout - controls layout options
 * @exports {Object} documents - mongodb document limits
 *
 */


export const layout = {
    TOP_NAV: false,                                 // turns off top nav bar links; side nav only
    SECONDARY_LOGO: false,                          // secondary logo support (optional)
    SHORTCUTS: true                                 // builds  short cut menu that is in Navbar; mobile has shortcuts at bottom
}

export const documents = {
    LIMIT_MAX_SMALL: 200,                           // smaller limit for document retrieval
    MAX_IMAGE_SIZE: 500 * 1024,                     // max size in bytes for an input file
    LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
    VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)
};