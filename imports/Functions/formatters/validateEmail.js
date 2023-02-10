/**
 * Validate a user entered email address.
 *
 * @function validateEmail
 * @memberOf Functions:formatters:
 * @locus Anywhere
 *
 * @param {String} email - email string to check
 * @returns {Boolean} - pass / fail
 *
 */


export function validateEmail(email){
    if(email && typeof email === 'string'){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }else{
        return false;
    }
}
