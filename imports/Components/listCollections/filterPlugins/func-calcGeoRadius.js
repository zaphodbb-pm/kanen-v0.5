/**
 * Builds an offset date for the date filter.  To be used with "input" element type=date.
 *
 * @function buildGeoRadius
 * @memberOf Components:listCollections:
 * @locus Client
 *
 * @param {String} sel - value from select element
 * @param {Object} me - user lat / long from browser navigation
 * @param {Object} field - field config information => field key
 *
 * @return {Object} - user lat / long in MongoDb format
 *
 */


export function calcGeoRadius(sel, me, field){
    const radius = {
        default: 1000 * 1000,
        nearby: 5 * 1000,
        citywide: 30 * 1000,
        inregion: 250 * 1000
    }

    const lat = me?.lat ?? 45;
    const lng = me?.lng ?? -75;
    const hasCoord = !!me?.lat && !!me?.lng;

    let out;

    switch (true) {
        case sel === "none" || sel === "all":
            out = null;
            break;

        //** build geolocation object
        case field.field === "geoLocation":
            const dist = hasCoord ? radius[sel] ?? radius["default"] : radius["default"];

            out = {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: dist
                }
            };
            break;

        default:
            out = null;
    }

    return out;
}