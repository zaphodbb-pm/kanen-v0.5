/* sample test object */
const query = [
  {numItems : 10, start: 0, queried: 30, sort: {test: -1}},
  {numItems : 11, start: 3, queried: 66, sort: {test: -1}},
  {numItems : 12, start: 1, queried: 16, sort: {test: -1}},
  {numItems : 13, start: 2, queried: 16, sort: {test: -1}},
];

/* expected result object */
const checkQuery = [
  {start:1,  end:0,  filterSubscribe:{sort:{test:-1},limit:10}, filterSearch:{sort:{test:-1},skip:0,limit:10}},
  {start:23, end:33, filterSubscribe:{sort:{test:-1},limit:11}, filterSearch:{sort:{test:-1},skip:22,limit:11}},
  {start:1,  end:12, filterSubscribe:{sort:{test:-1},limit:12}, filterSearch:{sort:{test:-1},skip:0,limit:12}},
  {start:14, end:16, filterSubscribe:{sort:{test:-1},limit:3},  filterSearch:{sort:{test:-1},skip:13,limit:3}},
];

import assert from "assert";
import {buildFilter} from "../func-buildFilter";
describe("component ListCollections - function buildFilter", function () {

  it("function buildFilter", function () {

    query.forEach( (item, idx) => {
      let out = buildFilter(item.numItems, item.start, item.queried, item.sort);
      assert.deepStrictEqual(out, checkQuery[idx], `Result at index ${idx} was ${JSON.stringify(out)}.`);
    });

  });

});
