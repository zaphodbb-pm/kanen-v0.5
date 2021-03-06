/**
 * Executes assertion tests based on node.js assertion module for a single test plan.
 *
 * @memberof Tests
 * @function testAssertions
 * @locus Server
 *
 * @param {Object} plan - {label, tests: array of object scenarios }
 * @param {Object} link - absolute file path from user top
 *
 * @module doTest
 */


import assert from "assert";

import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const sinon = require("sinon");

export async function testAssertions(plan, func){

    if(plan && func){
        describe(`${plan.label} / ${plan.tests.length} tests`, function () {

            plan.tests.forEach( tv => {
                let underTest = func;

                if(tv.function){
                    if(typeof tv.function === "string"){
                        underTest = func[tv.function];
                    }

                    if( Array.isArray(tv.function) ){
                        underTest = func(...tv.function);
                    }
                }

                it(tv.test, function () {
                    switch (tv.type){
                        case "strictEqual":
                            assert.strictEqual(underTest(...tv.args), tv.result);
                            break;

                        case "deepStrictEqual":
                            assert.deepStrictEqual(underTest(...tv.args), tv.result);
                            break;

                        case "match":
                            assert.match(underTest(...tv.args), tv.result);
                            break;

                        case "ok":
                            assert.ok(underTest(...tv.args));
                            break;

                        case "notOk":
                            assert.ok(!underTest(...tv.args));
                            break;

                        case "checkMutate":
                            underTest(...tv.args);
                            assert.deepStrictEqual(tv.args[0], tv.original);
                            break;

                        case "checkStringLength":
                            assert.strictEqual(underTest(...tv.args).length, tv.result);
                            break;

                        case "checkKeysLength":
                            assert.strictEqual( Object.keys(underTest(...tv.args)).length, tv.result);
                            break;

                        default:
                            assert.strictEqual(underTest(...tv.args), tv.result);
                    }
                });
            });
        });
    } else{
        console.log(module, "test plan not found");
    }
}
