/**
 * Configuration for ChangePassword Components (optional).
 *
 * @name changePassword_config
 * @constant {Object}
 * @memberOf Pages:changePassword
 * @locus Client
 *
 * @property {Object} pageConfig - form[{}]
 *
 */

export const pageConfig =  {

    form: {
        oldPassword: {
            field: "oldPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },


        newPassword: {
            field: "newPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        }
    }
}