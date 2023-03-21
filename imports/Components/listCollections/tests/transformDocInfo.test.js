/* sample test object */
const fields = [
  {
    field:  "name",
    key:    "name",
    type:   "edit",
    label:  "Name",
    sort:   1,
    search: true,
  },

  {
    field:  "startImage",
    key:    "startImage",
    type:   "cardImage",
    label:  "tbd",
    sort:   1,
    search: true,
  },

  {
    field:  "startStaticSelect",
    key:    "startStaticSelect.name",
    type:   "select",
    label:  "tbd",
    sort:   1,
    search: true,
    filter: {_id: "none", name: "None"}
  },

  {
    field:  "startDateTime",
    key:    "startDateTime",
    type:   "date",
    label:  "tbd",
    sort:   1,
    search: true,
    filter: {mode: "range"}
  },


  /*
  {
      field:  "geoLocation",
      key:    "geoLocation",
      type:   "address",
      label:  "tbd",
      sort:   false,
      search: true,
      filter: {_id: "none", name: "World Wide"}
  },

   */


  {
    field:  "_id",
    key:    "_id",
    type:   "del",
    label:  "tbd",
    sort:   false,
    search: false,
  },
]

const query = [
  {coll : "starter", doc: {}  },

];

/* expected result object */
const checkQuery = [
  {start:1,  end:0,  filterSubscribe:{sort:{test:-1},limit:10}, filterSearch:{sort:{test:-1},skip:0,limit:10}},
  {start:23, end:33, filterSubscribe:{sort:{test:-1},limit:11}, filterSearch:{sort:{test:-1},skip:22,limit:11}},
  {start:1,  end:12, filterSubscribe:{sort:{test:-1},limit:12}, filterSearch:{sort:{test:-1},skip:0,limit:12}},
  {start:14, end:16, filterSubscribe:{sort:{test:-1},limit:3},  filterSearch:{sort:{test:-1},skip:13,limit:3}},
];

import assert from "assert";
import {transformDocInfo} from "../func-transformDocInfo";
describe("ListCollections - function transformDocInfo", function () {

  it("function transformDocInfo", function () {

    query.forEach( (item, idx) => {
      let out = transformDocInfo(item.coll, item.doc, fields);
      assert.deepStrictEqual(out, checkQuery[idx], `Result at index ${idx} was ${JSON.stringify(out)}.`);
    });

  });

});
