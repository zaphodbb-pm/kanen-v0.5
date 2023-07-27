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
        title:      "Login Form",
        subtitle:   "You will need an account to use the Recipe Box.",
        body:       "Please use your unique e-mail address to login or another account service that you are a member of.",
    }
};


export const page = {

    page: {
        en: {
            //* card general labels
            btnSend: "Sign In",

            btnSendSubscribe: "Join Now",

            //* card field specific labels
            labelTitle: "Log In",
            labelDivider: "OR",

            labelSubscribe: "Subscribe",

            forgotPassword: "Forgot Password?"
        }
    },

    form: {
        en: {
            loginEmail: {
                label: "Email",
                helpText: "",
            },

            loginPassword: {
                label: "Password",
                tag: {
                    show: "Show Password",
                    hide: "Hide Password",
                }
            },

            resetEmail: "An email has been sent to you to allow you to reset your password.",
        }
    },

    formSubscribe: {
        en: {
            subscribeEmail: {
                label: "New Subscriber Email",
                helpText: "Checks for unique and valid email before creating your account.",
            },

            subscribePassword: {
                label: "Password to Use",
                tag: {
                    show: "Show Password",
                    hide: "Hide Password",
                }
            },

            createAccountEmail: "An email has been sent to you to allow you to validate your email address and to set your password."
        }
    }
};
