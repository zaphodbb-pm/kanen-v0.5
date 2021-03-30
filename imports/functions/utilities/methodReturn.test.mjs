/**
 * Test plan
 *
 * @memberof Tests
 * @augments methodReturn
 * @locus Anywhere
 *
 */


import {methodReturn} from "./methodReturn.mjs";
export const underTest = methodReturn;



export const testPlan = {
    label: "function methodReturn",

    tests: [
        {   test: "normal message",
            args: [undefined, {some: "value"}, "Test-Point", "s"],
            result: 'debug method_Test-Point: Return= {"some":"value"}',
            type: "deepStrictEqual",
        },

        /*

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

         */
    ]
}




