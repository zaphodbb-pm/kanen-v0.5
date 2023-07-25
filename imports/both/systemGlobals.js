/**
 * Client side constants to set up the environment.
 * This file provides a single entry point to provide consistency across all pages, Components and elements.
 *
 * @name systemGlobals
 * @memberOf App
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
    LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
    LIMIT_MAX_SMALL: 200,                           // smaller limit for document retrieval
    MAX_IMAGE_SIZE: 600 * 1024,                     // max size in bytes for an input file
    MAX_GRID_FILE: 1024 * 1024 * 4,                 // max file size for retrieving or storing as grid FS file
    SIZE_GRID_IMAGE: 600,                           // image converted width for grid storage
    SIZE_BROWSE_IMAGE: 400,                         // image converted width for in document storage
    SIZE_GRID_THUMBNAIL: 192,                       // thumbnail converted width for grid storage
    SIZE_CROPPIE_WIDTH: 500,                        // max croppie width
    VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)
};