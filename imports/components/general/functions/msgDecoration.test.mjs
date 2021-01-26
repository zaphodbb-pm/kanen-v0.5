import assert from "assert";

import {msgDecoration} from './msgDecoration.mjs'

const state =["success", "warning", "fail"];
const colours = ["is-success is-light", "is-warning is-light", "is-danger is-light"];
const icons = ["iconMsgSuccess", "iconMsgWarning", "iconMsgFail"];
const close = true;
const dur = 1010;


describe("comp-func msgDecoration", function () {
    it("message success", function () {
        const idx = 0;
        const out = msgDecoration(state[idx], close, dur);
        const checker = {closable: close, duration: dur, colour: colours[idx], hasIcon: icons[idx]}
        assert.deepStrictEqual(out, checker);
    });

    it("message warning", function () {
        const idx = 1;
        const out = msgDecoration(state[idx], close, dur);
        const checker = {closable: close, duration: dur, colour: colours[idx], hasIcon: icons[idx]}
        assert.deepStrictEqual(out, checker);
    });

    it("message fail", function () {
        const idx = 2;
        const out = msgDecoration(state[idx], close, dur);
        const checker = {closable: close, duration: dur, colour: colours[idx], hasIcon: icons[idx]}
        assert.deepStrictEqual(out, checker);
    });
});
