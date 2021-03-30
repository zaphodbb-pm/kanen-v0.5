/**
 * Test plan
 *
 * @memberof Tests
 * @augments validateEmail
 * @locus Anywhere
 *
 */


import {validateEmail} from "./validateEmail.mjs";
export const underTest = validateEmail;

export const testPlan = {
    label: "function validateEmail",

    tests:  [
        {test: "normal formatting", args: ["abcdef@example.com"], type: "ok"},
        {test: "invalid domain", args: ["abcdef@example."], type: "notOk"},
        {test: "missing user name", args: ["@example.com"], type: "notOk"},
    ]
}
