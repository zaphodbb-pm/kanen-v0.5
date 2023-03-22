/**
 * Checks if string contains a dot notation key.
 * If not, then returns object value directly from object by key else takes a string representation
 * of an object and converts into an object reference and returns the object value.
 *
 * @function dotNotation
 * @memberOf Functions:utilities:
 * @locus Client
 *
 * @param {Object} obj - parent to extract field from
 * @param {String} string - field name or dot name
 *
 * @return {String|Number|Object}
 *
 * @example
 *      use:
 *            given obj = {a:{b:{etc:5}}}
 *            dotNotation(obj,'a.b.etc')
 *            returns 5
 *
 *            If a field does not exist, then a "null" value is returned
 */

export function dotNotation(obj, string){
    let out = null;

    if( string && obj && typeof obj === "object" && !Array.isArray(obj) ){

        if( string.includes('.') ){
            let walkString = {...obj};

            ( string.split('.') ).forEach(function(field){
                walkString = walkString ? walkString[field] ?? null : null;
            });

            out = walkString;
        }else{
            out = obj[ string ] ?? null;
        }
    }

    return out;
}
