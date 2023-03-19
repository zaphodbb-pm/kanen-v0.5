/* sample test object */
const data = [
    {_id: "days_p_1", name: "Today"},
    {_id: "days_p_7", name: "Past Week"},
    {_id: "days_p_30", name: "Past Month"},
    {_id: "days_p_90", name: "Past Quarter"},
    {_id: "days_f_1", name: "Tomorrow"},
    {_id: "days_f_7", name: "This Week"},
    {_id: "days_f_30", name: "This Month"},
    {_id: "days_f_90", name: "This Quarter"}
];

/* expected result object */
const checkQuery = [1, 7, 30, 90, 1, 7, 30, 90];

import assert from "assert";
import {buildRelativeDate} from "../func-buildRelativeDate";
describe("component ListCollections > filterPlugins - function buildRelativeDate", function () {
  data.forEach( (test, idx) => {
    const day = 1000 * 3600 * 24;

    it(`test ${idx + 1}: ${test.name}`, function(){
      let out = buildRelativeDate(test._id);

      const hasGTE = out["$gte"] && typeof out["$gte"] === "string" && out["$gte"].length === 10;
      const hasLTE = out["$lte"] && typeof out["$lte"] === "string" && out["$lte"].length === 10;

      const start = hasGTE ? (new Date(out["$gte"]) ).getTime() : 0;
      const end = hasLTE ? (new Date(out["$lte"]) ).getTime() : 0;
      const range = (end - start) / day;

      assert.ok(hasGTE && hasLTE && range === checkQuery[idx], `Result at index ${idx} was ${JSON.stringify(out)}.`);
    });

  });
});
