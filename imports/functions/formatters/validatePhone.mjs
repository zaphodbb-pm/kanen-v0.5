/**
 * Validate a user entered phone number.
 *
 * @memberof Functions
 * @function validatePhone
 * @locus Anywhere
 *
 * @param {String} phone - string of phone number to check
 *
 * @returns {Object} - {test: pass / fail, filter: telephone number with extraneous chars removed}
 *
 */


export function validatePhone(phone){
    //* clean input string
    if(phone){
        let tel = phone.toLowerCase().replace(/[^\+\d\s\-\.\(\)\#\x\ext]+/g, "");

        //* test string for valid phone numbner
        let re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

        return {
            test: re.test(tel),
            filter: tel.trim()
        }
    }else{
        return {filter: "", test: false};
    }
}


const test1 = {filter: "+1 (613) 234-0987 ext 123", test: true};
const test2 = {filter: "(613) 234-0987 x 123", test: false};
const test3 = {filter: "613234098", test: false};
const test4 = {filter: "", test: false};


export const testPlan = {
    label: "function validatePhone",

    tests:  [
        {test: "normal formatting", args: ["+1 (613) 234-0987 ext 123"], result: test1 , type: "deepStrictEqual"},
        {test: "not clean format", args: ["phon (613) 234-0987 box 123"], result: test2 , type: "deepStrictEqual"},
        {test: "truncated number", args: ["613234098"], result: test3,  type: "deepStrictEqual"},
        {test: "no phone number", args: [undefined], result: test4, type: "deepStrictEqual"},
    ]
}
