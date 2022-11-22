/**
 * Configuration for Login Components (optional).
 *
 * @name login_config
 * @constant {Object}
 * @memberOf Pages:login
 * @locus Client
 *
 * @property {Object} pageConfig - {form, services}
 */

export const pageConfig =  {

    form: [

        {
            field: "loginEmail",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "email", autocomplete: "username"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },

        {
            field: "loginPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        }
    ],

    //** each login services also needs registration on the server:main.test.js -> function registerExternalLogin()
    services: [
        {
            icon:   "icon-bg-google",
            title:  "Google",
            service: "loginWithGoogle"
        }

    ]
};
