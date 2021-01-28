/**
 * Checks if string contains a dot notation key.
 * If not, then returns object value directly from object by key else takes a string representation
 * of an object and converts into an object reference and returns the object value.
 *
 * @memberof Functions
 * @function dotNotation
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

    if( obj && string ){

        if( string.includes('.') ){
            out = obj;
            ( string.split('.') ).forEach(function(field){
                out = out[field] ?? null;
            });
        }else{
            out = obj[ string ];
        }
    }

    return out;
}




export const testPlan = {
    label: "function dotNotation",

    tests: [
        {test: "normal field get", args: [{a:{b:{etc:5}}}, 'a.b.etc'], type: "strictEqual", result: 5},
        {test: "missing field", args: [{a:{b:{def:5}}}, 'a.b.etc'], type: "strictEqual", result: null},
        {test: "no object", args: [undefined], type: "strictEqual", result: null},
    ]
}
