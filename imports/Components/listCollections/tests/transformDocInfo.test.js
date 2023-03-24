/* sample test object */
import {fields} from "./fields_list"

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
    {"field":"name","type":"edit","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testImage","type":"pict","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testSelect","type":"select","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testDate","type":"date","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testEmails","type":"email","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testTags","type":"tag","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testObject","type":"object","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"updatedAt","type":"text","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testCheck","type":"check","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testId","type":"id","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testLink","type":"link","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testModal","type":"modal","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testModalUser","type":"modalUser","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testPhone","type":"phone","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testStatus","type":"status","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testNewPage","type":"newpage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"testBoolean","type":"boolean","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"},
    {"field":"_id","type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"az"}
  ],

  [
    {"field":"name","type":"edit","value":"Test Doc","base":"","url":"Test Doc","prefix":"","suffix":"","name":"TD"},
    {"field":"testImage","type":"pict","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testSelect","type":"select","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testDate","type":"date","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testEmails","type":"email","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testTags","type":"tag","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testObject","type":"object","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"updatedAt","type":"text","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testCheck","type":"check","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testId","type":"id","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testLink","type":"link","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testModal","type":"modal","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testModalUser","type":"modalUser","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testPhone","type":"phone","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testStatus","type":"status","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testNewPage","type":"newpage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"testBoolean","type":"boolean","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"field":"_id","type":"del","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"}
  ],

  [
    {"id":"testId","field":"name","type":"edit","value":"Test Doc","base":"","url":"Test Doc","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testImage","type":"pict","value":"image.jpg","base":"","url":"image.jpg","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testSelect","type":"select","value":"Sunday","base":"","url":"Sunday","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testDate","type":"date","value":"2023-01-01","base":"","url":"2023-01-01","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testEmails","type":"email","value":[{"address":"abc@example.com"}],"base":"","url":"[object Object]","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testTags","type":"tag","value":{"data":{"event":"tagLabel"}},"base":"","url":"[object Object]","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testObject","type":"object","value":"{\"one\":\"one\", \"two\":2}","base":"","url":"{\"one\":\"one\", \"two\":2}","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"updatedAt","type":"text","value":"53 years ago","base":"","url":"53 years ago","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testCheck","type":"check","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testId","type":"id","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testLink","type":"link","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testModal","type":"modal","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testModalUser","type":"modalUser","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testPhone","type":"phone","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testStatus","type":"status","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testNewPage","type":"newpage","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"testBoolean","type":"boolean","value":null,"base":"","url":"","prefix":"","suffix":"","name":"TD"},
    {"id":"testId","field":"_id","type":"del","value":"testId","base":"","url":"testId","prefix":"","suffix":"","name":"TD"}
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
