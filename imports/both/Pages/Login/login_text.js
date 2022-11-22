/**
 * Text for Login page.
 *
 * @name login_text
 * @constant {Object}
 * @memberOf Pages:login
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, form}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Login Form",
        lead:   "Direct login or account service.",
        body:   "Please use your unique e-mail address to login or another account service that you are a member of.",
    }
};


export const page = {

    page: {
        en: {
            //* card general labels
            btnSend: "Sign In",

            //* card field specific labels
            labelTitle: "Log In",
            labelDivider: "OR",
        }
    },

    form: {
        en: {
            loginEmail: {
                label: "Email",
                helpText: "Checks for valid email before saving.  This field is 'watched' by startPhone at right.",
            },

            loginPassword: {
                label: "Password",
                helpText: "TBD check strength",
                tag: {
                    show: "Show Password",
                    hide: "Hide Password",
                }
            }
        }
    }
};
