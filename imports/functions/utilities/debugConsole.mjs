/**
 * Control the output of debug messages to the browser console.
 *
 * @memberof Functions
 * @function debugConsole
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
 *              "c" = components.
 *              "e" = event handlers.
 *              "f" = functions.
 *              "m" = collection methods.
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




export const testPlan = {
    label: "function debugConsole",

    tests: [
        {   test: "normal message",
            args: ["s", "Test", [{some: "value"}], ["Label"], "s"],
            result: 'debug Test: Label= {"some":"value"}',
            type: "deepStrictEqual",
        },

        {   test: "no debug options set",
            args: ["s", "Test", [{some: "value"}], ["Label"], ""],
            result: false,
            type: "strictEqual",
        },

        {   test: "no message level set",
            args: ["", "Test", [{some: "value"}], ["Label"], "s"],
            result: false,
            type: "strictEqual",
        }
    ]
}
