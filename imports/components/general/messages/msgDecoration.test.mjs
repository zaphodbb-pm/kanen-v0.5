/**
 * Test plan
 *
 * @memberOf Tests
 * @augments msgDecoration
 * @locus Anywhere
 *
 */

import {msgDecoration} from './msgDecoration.js'
export const underTest = msgDecoration;

const state =["success", "warning", "fail"];
const colours = ["is-success is-light", "is-warning is-light", "is-danger is-light"];
const icons = ["iconMsgSuccess", "iconMsgWarning", "iconMsgFail"];
const close = true;
const dur = 1010;


export const testPlan = {
    label: "function msgDecoration",

    tests:  [
        {   test: "message success",
            args: [state[0], close, dur],
            type: "deepStrictEqual",
            result: {closable: close, duration: dur, colour: colours[0], hasIcon: icons[0]}
        },

        {   test: "message success defaults",
            args: [state[0]],
            type: "deepStrictEqual",
            result: {closable: true, duration: 0, colour: colours[0], hasIcon: icons[0]}
        },

        {   test: "message warning",
            args: [state[1], close, dur],
            type: "deepStrictEqual",
            result: {closable: close, duration: dur, colour: colours[1], hasIcon: icons[1]}
        },

        {   test: "message fail",
            args: [state[2], close, dur],
            type: "deepStrictEqual",
            result: {closable: close, duration: dur, colour: colours[2], hasIcon: icons[2]}
        },
    ]
}
