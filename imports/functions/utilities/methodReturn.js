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
 * @return {String|Object|Array|Number}
 *
 */


//** deals with return values from a server method call
export function methodReturn(err, res, label, options) {
    if( options.includes("s") ){
        const labelOut = label ?? "out";

        if (err) {
            const out = JSON.parse( JSON.stringify(err) );
            console.log(`debug err: ${labelOut}= `, out);
            return `debug err: ${labelOut}= ` + JSON.stringify(out);
        }
        if (res) {
            const out = JSON.parse( JSON.stringify(res) );
            console.log(`debug res: ${labelOut}= `, out);
            return `debug res: ${labelOut}= ` + JSON.stringify(out);
        }
    }

    return false;
}
