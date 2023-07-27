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

            attributes: {type: "email", autocomplete: "username", name: "loginEmail"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },

        {
            field: "loginPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password", name: "loginPassword"},
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

    ],


    formSubscribe: [

        {
            field: "subscribeEmail",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "email", name: "subscribeEmail"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },

        {
            field: "subscribePassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", name: "subscribePassword"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        }
    ],

    //** each login services also needs registration on the server:main.test.js -> function registerExternalLogin()

    /*
    servicesSubscribe: [
        {
            icon:   "icon-bg-google",
            title:  "Google",
            service: "loginWithGoogle"
        }

    ]

     */
};
