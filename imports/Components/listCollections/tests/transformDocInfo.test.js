/* sample test object */
const fields = [
  {
    field:  "name",
    key:    "name",
    type:   "edit",
    label:  "Name",
  },

  {
    field:  "testImage",
    key:    "testImage",
    type:   "cardImage",
    label:  "tbd",
  },

  {
    field:  "testSelect",
    key:    "testSelect.name",
    type:   "select",
    label:  "tbd",
  },

  {
    field:  "testDate",
    key:    "testDate",
    type:   "date",
    label:  "tbd",
  },

  {
    field:  "testEmails",
    key:    "testEmails",
    type:   "email",
    label:  "tbd",
  },

  {
    field:  "testTags",
    key:    "testTags",
    type:   "tag",
    label:  "tbd",
  },

  {
    field:  "testObject",
    key:    "testObject",
    type:   "object",
    label:  "tbd",
  },

  {
    field:  "updatedAt",
    key:    "updatedAt",
    type:   "updatedAt",
    label:  "tbd",
  },

  {
    field:  "_id",
    key:    "_id",
    type:   "del",
    label:  "tbd",
  },
]

const query = [
  {coll : "user", doc: {}  },
  {coll : "user", doc: {name: "Test Doc"}  },

  {coll : "user",
    doc: {
      _id: "testId",
      name: "Test Doc",
      testImage: "image.jpg",
      testSelect: {_id: "sun", name: "Sunday"},
      testDate: "2023-01-01",
      testEmails: [{address: "abc@example.com"}],
      testTags: {data: {event: "tagLabel"}},
      testObject: {one: "one", two: 2},
      updatedAt: 1234567890
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
    {"type":"email","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"tag","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"object","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"updatedAt","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"}
  ],

  [
    {"type":"edit","value":"Test Doc","base":"","url":"Test Doc","prefix":"","suffix":"","name":"TD"},
    {"type":"cardImage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"select","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"date","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"email","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"tag","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"object","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"updatedAt","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"}
  ],

  [
    {"id":"testId","type":"edit","value":"Test Doc","base":"","url":"Test Doc","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"cardImage","value":"image.jpg","base":"","url":"image.jpg","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"select","value":"Sunday","base":"","url":"Sunday","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"date","value":"2023-01-01","base":"","url":"2023-01-01","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"email","value":[{"address":"abc@example.com"}],"base":"","url":"[object Object]","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"tag","value":{"data":{"event":"tagLabel"}},"base":"","url":"[object Object]","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"object","value":"{\"one\":\"one\", \"two\":2}","base":"","url":"{\"one\":\"one\", \"two\":2}","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"updatedAt","value":"53 years ago","base":"","url":"53 years ago","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","type":"del","value":"testId","base":"","url":"testId","prefix":"","suffix":"","name":"TD"}
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
