/* sample test object */
const data = [
  {sel: "all", me: {lat: 44, lng: -75}, field: { field: "geoLocation" } },
  {sel: "no user co-ordinates", me: {}, field: { field: "geoLocation" } },
  {sel: "nearby", me: {lat: 44, lng: -75}, field: { field: "geoLocation" } },
  {sel: "citywide", me: {lat: 44, lng: -75}, field: { field: "geoLocation" } },
  {sel: "inregion", me: {lat: 44, lng: -75}, field: { field: "geoLocation" } },
];

/* expected result object */
const checkQuery = [
    null,
  {$nearSphere:{$geometry:{type:"Point",coordinates:[-75,45]},$maxDistance:1000000}},
  {$nearSphere:{$geometry:{type:"Point",coordinates:[-75,44]},$maxDistance:5000}},
  {$nearSphere:{$geometry:{type:"Point",coordinates:[-75,44]},$maxDistance:30000}},
  {$nearSphere:{$geometry:{type:"Point",coordinates:[-75,44]},$maxDistance:250000}},
];

import assert from "assert";
import {calcGeoRadius} from "../func-calcGeoRadius";
describe("ListCollections > filterPlugins - function calcGeoRadius", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.sel}`, function(){
      let out = calcGeoRadius(test.sel, test.me, test.field);
      assert.deepStrictEqual(out, checkQuery[idx], `Result at index ${idx} was ${JSON.stringify(out)}.`);
    });

  });
});
