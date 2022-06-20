/**
 * Test plan
 *
 * @memberof Tests
 * @augments validatePhone
 * @locus Anywhere
 *
 */



const test1 = {filter: "+1 (613) 234-0987 ext 123", test: true};
const test2 = {filter: "(613) 234-0987 x 123", test: false};
const test3 = {filter: "613234098", test: false};
const test4 = {filter: "", test: false};


export const testPlan = {
    label: "function validatePhone",

    tests:  [
        {test: "normal formatting", args: ["+1 (613) 234-0987 ext 123"], result: test1, type: "deepStrictEqual"},
        {test: "not clean format", args: ["phon (613) 234-0987 box 123"], result: test2, type: "deepStrictEqual"},
        {test: "truncated number", args: ["613234098"], result: test3, type: "deepStrictEqual"},
        {test: "no phone number", args: [undefined], result: test4, type: "deepStrictEqual"},
    ]
}
