/**
 * Executes assertion tests based on node.js assertion module for a single test plan.
 *
 * @memberof Tests
 * @function testAssertions
 * @locus Server
 *
 * @param {Object} link - absolute file path from user top
 *
 * @module doTest
 */


import assert from "assert";

import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const sinon = require("sinon");

export async function testAssertions(module){
    const plan = module.testPlan;
    const getFunction = Object.keys(module).filter( f => f !== "testPlan")
    const underTest = module[ getFunction[0] ];

    console.log("getFunction", getFunction[0]);

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
    } else{
        console.log(getFunction[0], "not found");
    }
}