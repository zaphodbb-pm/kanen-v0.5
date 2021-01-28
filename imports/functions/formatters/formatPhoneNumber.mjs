/**
 * @summary Formats a string of digits into a North American formatted phone number.
 *
 * @memberof Functions
 * @function formatPhoneNumber
 * @locus Client
 *
 * @param {String} str - phone digits
 *
 * @return {string} (613) 234-1234
 *
 */

export function formatPhoneNumber(str) {
    if(typeof str !== "string"){return "";}

    let cleaned = ('' + str).replace(/\D/g, '');         // Filter only formatters from the input
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})(\d+)?$/);    // Check if the input is of correct format
    let out = "";

    if (match) {
        let intlCode = (match[1] ? '+1 ' : '');                  //Remove matched extension code and change to format for any country code.
        let ext = (match[5] ? ' x' + match[5] : '');
        out = [intlCode, '(', match[2], ') ', match[3], '-', match[4], ext].join('');
    }

    return out;
}



export const testPlan = {
    label: "function formatPhoneNumber",

    tests: [
        {test: "undefined args", args: [undefined], type: "strictEqual", result: ""},
        {test: "not a string", args: [123], type: "strictEqual",  result: ""},
        {test: "truncated phone number", args: ["123"], type: "strictEqual",  result: ""},
        {test: "local number", args: ["6132340987"], type: "strictEqual",  result: "(613) 234-0987"},
        {test: "partial full phone number", args: ["237890123"], type: "strictEqual",  result: ""},
        {test: "full phone number", args: ["12378901234"], type: "strictEqual", result: "+1 (237) 890-1234"},
    ]
}
