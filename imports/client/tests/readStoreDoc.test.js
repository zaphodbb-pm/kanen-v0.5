/* test data */
const coll = "favourites";
const doc = {
  name: "Test Doc"
};

const docUpdate = {
  newField: "Some New Field",
  newArray: ["a", "b"]
};

const otherText = "Some other replacement text.";
const otherElement = "c";

/* imports */
import {Meteor} from "meteor/meteor";
import assert from "assert";

/* local variables */
let docId;



describe("methods for docs store and read", function () {
  it(`ensure DB is empty`, async function () {
    const getResult = await Meteor.callAsync("getCollData", coll, "allFields");

    for (const item of getResult) {
      const result = await Meteor.callAsync("removeDoc", coll, item._id);
      assert.ok(result && result.status === 200, `Failed to remove existing document.`)
    }
  });

  it(`method "countDocs"`, async function () {
    const result = await Meteor.callAsync("countDocs", coll, {});
    assert.ok(result === 0, `Should have no documents in test database, found ${result}. Reload tests.`);
  });

  it(`method "insertDoc"`, async function () {
    const insertResult = await Meteor.callAsync("insertDoc", coll, doc);
    docId = insertResult?._id ?? "";
    assert.ok(insertResult && insertResult.status === 200, `Failed to store initial doc.`);
  });

  it(`method "updateDoc"`, async function () {
    const updateResult = await Meteor.callAsync("updateDoc", coll, docId, docUpdate);
    assert.ok(updateResult && updateResult.status === 200, `Failed to update doc.`);
  });

  it(`method "updateDocField"`, async function () {
    const updateResult = await Meteor.callAsync("updateDocField", coll, docId, "newField", otherText);
    assert.ok(updateResult && updateResult.status === 200, `Failed to update doc.`);
  });

  it(`method "updateDocArray"`, async function () {
    const updateResult = await Meteor.callAsync("updateDocArray", coll, "push", docId, "newArray", otherElement);
    assert.ok(updateResult && updateResult.status === 200, `Failed to update doc.`);
  });

  it(`method "getCollData"`, async function () {
    let getResult = await Meteor.callAsync("getCollData", coll, "allFields");

    assert.ok(getResult && Array.isArray(getResult), `Failed to retrieve docs.`);
    getResult = getResult[0];

    const checkResult =[
      getResult._id === docId,
      getResult.name === doc.name,
      getResult.tenantId === "general",
      typeof getResult.updatedAt === "number",
      getResult.group === "",
      [...docUpdate.newArray, otherElement].every((val, index) => val === getResult.newArray[index]),
      getResult.newField === otherText
    ];

    assert.ok(checkResult.every( item => item), `Incorrect returned doc, found ${JSON.stringify(getResult[0])}` )
  });

  it(`remove test doc`, async function () {
      const result = await Meteor.callAsync("removeDoc", coll, docId);
      assert.ok(result && result.status === 200, `Failed to remove existing document.`)
  });
});
