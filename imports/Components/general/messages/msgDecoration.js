/**
 * Builds decoration parameters for a system message.
 *
 * @function msgDecoration
 * @memberOf Components:general:
 * @locus client
 *
 * @param {String} state
 * @param {Boolean} closable
 * @param {Number} duration
 *
 * @return {Object} - {closable, duration, colour, hasIcon}
 */

export function msgDecoration(state, closable = true, duration = 0) {

    let common = {
        closable: closable,
        duration: duration
    }

    let states = {
        success: {
            colour: "is-success-light",
            hasIcon: "icon-bg-alert-success",
        },

        warning: {
            colour: "is-warning-light",
            hasIcon: "icon-bg-alert-warning",
        },

        fail: {
            colour: "is-danger-light",
            hasIcon: "icon-bg-alert-danger",
        },

        add: {
            colour: "is-secondary-light",
            hasIcon: "icon-bg-circle-plus",
        },

        remove: {
            colour: "is-link-light",
            hasIcon: "icon-bg-circle-minus",
        },

        uncertain: {
            colour: "",
            hasIcon: "icon-bg-help",
        }
    };

    return Object.assign({}, states[state], common);
}
