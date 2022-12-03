/**
 * Returns a browser type name.
 *
 * @function getPlatform
 * @memberOf Footer
 * @locus Client
 *
 * @param {Object} platform - browser types
 * @param {String} debug - use browser type from options
 * @param {Boolean} native - pwa is native to browser
 *
 * @return {string} - browser type
 *
 */


export function getPlatform( platform, debug, native,  ) {
    if (debug && typeof debug === "string" ) {
        return debug;
    }

    if ( platform.isChromium && ( native === undefined ) ) {
        return "native";
    } else if ( platform.isFireFox ) {
        return "firefox";
    } else if ( platform.isiPad ) {
        return "ipad";
    } else if ( platform.isiPhone ) {
        return "iphone";
    } else if ( platform.isOpera ) {
        return "opera";
    } else if ( platform.isSamsung ) {
        return "samsung";
    } else if ( platform.isEdge ) {
        return "edge";
    } else if ( platform.isChromium ) {
        return "chromium";
    } else {
        return "";
    }
}
