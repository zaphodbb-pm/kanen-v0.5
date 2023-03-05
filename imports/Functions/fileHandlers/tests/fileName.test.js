/* test data */
const data = [
  {name: "new_file_name", ext: "txt"},
]


import assert from "assert";
import {fileName} from "../fileName";

describe("function fileName", function () {
  data.forEach( (test, idx) => {

    it(`test ${idx + 1}: ${test.name} + date + ${test.ext}`, function(){
      const result = fileName(test.name, test.ext);

      // added date part: _2023-02-11#13_13 is 16 or 17 characters long
      // must also account for added "." for the extension part
      const fileLength = result.length - test.name.length - test.ext.length - 1;
      const dateLength =  fileLength === 16 || fileLength === 17;

      const testResult1 = result.startsWith(test.name);
      const testResult2 = result.includes("#") && dateLength;
      const testResult3 = result.endsWith("." + test.ext);

      assert.ok(testResult1 && testResult2 && testResult3, `Result was "${result}"`);
    });
  });

});
