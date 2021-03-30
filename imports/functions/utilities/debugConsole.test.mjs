/**
 * Test plan
 *
 * @memberof Tests
 * @augments debugConsole
 * @locus Anywhere
 *
 */


import {debugConsole} from "./debugConsole.mjs";
export const underTest = debugConsole;



export const testPlan = {
    label: "function debugConsole",

    tests: [
        {   test: "normal message",
            args: ["s", "Test", [{some: "value"}], ["Label"], "s"],
            result: 'debug Test: Label= {"some":"value"}',
            type: "deepStrictEqual",
        },

        {   test: "no debug options set",
            args: ["s", "Test", [{some: "value"}], ["Label"], ""],
            result: false,
            type: "strictEqual",
        },

        {   test: "no message level set",
            args: ["", "Test", [{some: "value"}], ["Label"], "s"],
            result: false,
            type: "strictEqual",
        }
    ]
}
