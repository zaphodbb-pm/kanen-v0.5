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

import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const sinon = require("sinon");

export function doTest(link){
    import(link).then( module => {
        const plan = module.testPlan;
        const getFunction = Object.keys(module).filter( f => f !== "testPlan")
        const underTest = module[ getFunction[0] ];

        if(plan){
            describe(plan.label, function () {
                plan.tests.forEach( tv => {
                    it(tv.test, function () {
                        switch (tv.type){
                            case "strictEqual":
                                assert.strictEqual(underTest(...tv.args), tv.result);
                                break;

                            case "deepStrictEqual":
                                assert.deepStrictEqual(underTest(...tv.args), tv.result);
                                break;

                            case "ok":
                                assert.ok(underTest(...tv.args));
                                break;

                            case "notOk":
                                assert.ok(!underTest(...tv.args));
                                break;

                            case "checkMutate":
                                assert.deepStrictEqual(tv.args[0], tv.original);
                                break;

                            case "checkStringLength":
                                assert.strictEqual(underTest(...tv.args).length, tv.result);
                                break;

                            default:
                                assert.strictEqual(underTest(...tv.args), tv.result);
                        }
                    });
                });
            });
        }
    })
        .catch(err => {console.log("err", err)})
}

