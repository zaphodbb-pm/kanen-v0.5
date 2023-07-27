/**
 * Text for ChangePassword page.
 *
 * @name changePassword_text
 * @constant {Object}
 * @memberOf Pages:changePassword
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, form, errMsg}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Manage Password Form",
        subtitle:   "Either change your password or reset it.",
        body:   "",
    }
};


export const page = {

    page: {
        en: {
            //* card general labels
            formPassword: {
                change: "Change Password",
                reset: "Reset Password",
            },

            //btnSend: "Change Password",

            //* card field specific labels
            formTitle: {
                change: "Change Password",
                reset: "Reset Password",
            }

            //labelTitle: "Change Password",

        }
    },

    form: {
        en: {
            oldPassword: {
                label: "Enter Old Password",
                helpText: "",
                tag: {
                    show: "Show Old Password",
                    hide: "Hide Old Password",
                }
            },

            newPassword: {
                label: "Enter New Password",
                helpText: "TBD check strength",
                tag: {
                    show: "Show New Password",
                    hide: "Hide New Password",
                }
            }
        }
    },

    errMsg: {
        en: {
            200: "Password changed",

            400: "Password fields may not be empty.",
            401: "You must be logged in to change your password.",
            403: "Incorrect Old Password.",

            404: "You do not have store privileges.",

            500: "System problem."
        }
    }
};
