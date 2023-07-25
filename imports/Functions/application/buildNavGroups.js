/**
 * Builds groups of navigation links array from routes info.
 *
 * @function buildNavGroups
 * @memberOf Functions:application:
 * @locus Anywhere
 *
 * @param {Object[]} routes - constructed router object array
 *
 * @see routes
 *
 * @return {Array} - array of arrays of link objects
 *
 */

export function buildNavGroups(routes) {
    let buildGroups = [];

    if(routes && Array.isArray(routes) && routes.length > 0){
        const trimRoutes = routes.map( item => {
            return {
                name: item.name,
                icon: item.icon,
                label: item.label,
                query: item.query,
                group: item.group
            }
        });

        trimRoutes.forEach( (route) => {
            if( typeof route.group === "number"){
                buildGroups[route.group] = buildGroups[route.group] ? buildGroups[route.group] : [];
                buildGroups[route.group].push(route);
            }
        });
    }

    return buildGroups;
}
