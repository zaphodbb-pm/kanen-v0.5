/**
 * Control the output of debug messages to the browser console.
 *
 * @function debugConsole
 * @memberOf Functions:utilities:
 * @locus Anywhere
 *
 * @param {String} level - see below
 * @param {String} name - label to help identify / tag the console message
 * @param {Array} vrbl - list of in program variable to report on
 * @param {Array} label - labels to prefix variables for identification
 * @param {String} debugOptions - a string of options that have been turned on by system
 *
 * @return test-point - false if no message or string plus variables
 *
 * @example
 *
 *    level = (String): one of "o", "c", "e", "f", "m", "p", "r", "s"
 *              "o" = onMount or onDestroy sections.
 *              "c" = Components.
 *              "e" = event handlers.
 *              "f" = Functions.
 *              "m" = collection Methods.
 *              "p" = page messages.
 *              "r" = reactive variable settings.
 *              "s" = system messages.
 *
 *              Note that "ocefmprs" will send messages from all sections.
 *              Any combination of switches can be used to select the appropriate amount of messages.
 *              Also, an empty string "" will stop all messages.
 *
 */


export function debugConsole(level, name, vrbl, label, debugOptions) {
    if(!debugOptions || !Array.isArray(vrbl) ){ return false; }

    //** if the debug level is set in SysConfigs.debugLevel, then output message
    if( level && debugOptions.includes(level)  ){
        let outReturn = "";
        vrbl.forEach( (v, idx) => {
            let labelOut = label && label[idx] ? label[idx] : "out";
            let out = JSON.parse( JSON.stringify(v) );
            console.log(`debug ${name}: ${labelOut}= `, out);

            outReturn = `debug ${name}: ${labelOut}= ` + JSON.stringify(out);
        });
        return outReturn;
    }
    return false;
}
