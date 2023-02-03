import assert from "assert";
import {allRoutes} from '../routes';

describe("Routes check", function () {


    it("check for 22 routes", function() {
        assert.strictEqual(allRoutes.length, 22);
    });

    allRoutes.forEach( item => {

        if(item.name !== "404"){
            it(`route: ${item.name} is object`, function() {
                assert.strictEqual(typeof item, "object");

                assert.strictEqual(typeof item.roles, 'object', `${item.name} does not have roles`);
                assert.strictEqual(typeof item.icon, 'string', `${item.name} does not have icon`);
                assert.strictEqual(typeof item.label, 'string', `${item.name} does not have label`);
                assert.strictEqual(typeof item.group, 'number', `${item.name} does not have group`);
                assert.strictEqual(typeof item.isNavMobile, 'boolean', `${item.name} does not have isNavMobile`);
            });
        }else{
            it(`route: ${item.name} is object`, function() {
                assert.strictEqual(typeof item, "object");
                assert.strictEqual(typeof item.roles, 'object', `${item.name} does not have roles`);
                assert.strictEqual(item.path, '404', `${item.name} does not have path`);
                assert.strictEqual(item.redirectTo, '/home', `${item.name} does not have redirectTo or target is incorrect`);
            });
        }
    });
});