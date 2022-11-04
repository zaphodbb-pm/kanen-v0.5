/**
 * Test plan
 *
 * @memberOf Tests
 * @augments adjustHexColor
 * @locus Anywhere
 *
 */


export const testPlan = {
    label: "function adjustHexColor",

    tests:  [
        {   test: "check for falsey values",
            args: [undefined, undefined],
            result: {color: null, text: "#000000"},
            type: "deepStrictEqual"
        },
        {   test: "check malformed colour value",
            args: ["777777", 0],
            result: {color: null, text: "#000000"},
            type: "deepStrictEqual"
        },
        {   test: "check for normal output",
            args: ["#777777", 0],
            result: {color: "#777777", text: "#FFFFFF"},
            type: "deepStrictEqual"
        },
        {   test: "check for below minimum range",
            args: ["#777777", -120],
            result: {color: "#000000", text: "#FFFFFF"},
            type: "deepStrictEqual"
        },
        {   test: "check for above maximum range",
            args: ["#777777", 120],
            result: {color: "#EEEEEE", text: "#000000"},
            type: "deepStrictEqual"
        },
    ]
}
