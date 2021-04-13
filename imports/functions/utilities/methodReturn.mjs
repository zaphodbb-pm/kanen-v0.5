/**
 * Handles info returned from a method call.
 *
 * @memberof Functions
 * @function methodReturn
 * @locus Client
 *
 * @param {String|Object} err - error code or message from method
 * @param {String|Object|Array|Number} res - result data from method call
 * @param {String} label - method name
 * @param {String} options - debug options string
 *
 * @return {Boolean|String} test-point - returns test-point from debugConsole
 *
 */

import {debugConsole} from './debugConsole.js'


//** deals with return values from a server method call
export function methodReturn(err, res, label, options) {
    if (err) {
        return debugConsole("s", `method_${label}`, [ err ], [ "Error" ], options );
    }
    if (res) {
        return debugConsole("s", `method_${label}`, [ res ], [ "Return" ], options );
    }
}
