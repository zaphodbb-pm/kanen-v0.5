/**
 * Executes assertion tests based on node.js assertion module.
 *
 * @memberof Tests
 * @function doTest
 * @locus Server
 *
 * @param {string} link - absolute file path from user top
 *
 * @module doTest
 */


import assert from "assert";

export function doTest(link){
    import(link).then( module => {
        const plan = module.testPlan;
        const getFunction = Object.keys(module).filter( f => f !== "testPlan")
        const underTest = module[ getFunction[0] ];

        if(plan){
            describe(plan.label, function () {
                plan.tests.forEach( tv => {

                    it(tv.test, function () {
                        const out = underTest(...tv.args);

                        switch (tv.type){
                            case "strictEqual":
                                assert.strictEqual(out, tv.result);
                                break;

                            case "deepStrictEqual":
                                assert.deepStrictEqual(out, tv.result);
                                break;

                            case "ok":
                                assert.ok(out);
                                break;

                            case "notOk":
                                assert.ok(!out);
                                break;

                            case "checkMutate":
                                assert.deepStrictEqual(tv.args[0], tv.original);
                                break;

                            case "checkStringLength":
                                assert.strictEqual(out.length, tv.result);
                                break;

                            default:
                                assert.strictEqual(out, tv.result);
                        }
                    });
                });
            });
        }

    })
        .catch(err => {console.log("err", err)})
}

