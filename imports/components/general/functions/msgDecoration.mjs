/**
 * Builds decoration parameters for a system message.
 *
 * @memberof Functions
 * @function msgDecoration
 * @locus client
 * @augments messages
 *
 * @param {String} state
 * @param {Boolean} closable
 * @param {Number} duration
 *
 * @return {Object} - {closable, duration, colour, hasIcon}
 */

export function msgDecoration(state, closable, duration) {

    let common = {
        closable: closable,
        duration: duration
    }

    let states = {
        success: {
            colour: "is-success is-light",
            hasIcon: "iconMsgSuccess",
        },

        warning: {
            colour: "is-warning is-light",
            hasIcon: "iconMsgWarning",
        },

        fail: {
            colour: "is-danger is-light",
            hasIcon: "iconMsgFail",
        },

        add: {
            colour: "is-info is-light",
            hasIcon: "iconMsgAdd",
        },

        remove: {
            colour: "is-link is-light",
            hasIcon: "iconMsgRemove",
        },

        uncertain: {
            colour: "",
            hasIcon: "iconMsgUncertain",
        }
    };

    return Object.assign({}, states[state], common);
}
