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
    filter: {_id: "none", name: "None"},
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
  {coll : "starter", doc: {name: "test_doc"}  },

  {coll : "starter",
    doc: {
      name: "test_doc",
      startImage: "image.jpg",
      startStaticSelect: {_id: "sun", name: "Sunday"},
      startDateTime: "2023-01-01",
      _id: "testId"
    }
  },

];

/* expected result object */
const checkQuery = [
  [
    {"type":"edit","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"cardImage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"select","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"date","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"}
  ],

  [
    {"type":"edit","value":"test_doc","base":"","url":"test_doc","prefix":"","suffix":"","name":"Te"},
    {"type":"cardImage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"Te"},
    {"type":"select","value":null,"base":"","url":"","prefix":"","suffix":"","name":"Te"},
    {"type":"date","value":null,"base":"","url":"","prefix":"","suffix":"","name":"Te"},
    {"type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"Te"}
  ],

  [
    {"id":"testId","type":"edit","value":"test_doc","base":"","url":"test_doc","prefix":"","suffix":"","name":"Te"},
    {"id":"testId","type":"cardImage","value":"image.jpg","base":"","url":"image.jpg","prefix":"","suffix":"","name":"Te"},
    {"id":"testId","type":"select","value":"Sunday","base":"","url":"Sunday","prefix":"","suffix":"","name":"Te"},
    {"id":"testId","type":"date","value":"2023-01-01","base":"","url":"2023-01-01","prefix":"","suffix":"","name":"Te"},
    {"id":"testId","type":"del","value":"testId","base":"","url":"testId","prefix":"","suffix":"","name":"Te"}
  ]
];

import assert from "assert";
import {transformDocInfo} from "../func-transformDocInfo";
describe("ListCollections - function transformDocInfo", function () {

  query.forEach( (item, idx) => {
    it(`test ${idx + 1}:`, function(){
      const out = transformDocInfo(item.coll, item.doc, fields);

      const msg = `Result at index ${idx} was ${JSON.stringify(out)}.`;
      assert.strictEqual(JSON.stringify(out), JSON.stringify(checkQuery[idx]) , msg);    });
  });

});
