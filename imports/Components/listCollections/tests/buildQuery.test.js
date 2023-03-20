/* sample test object */
const fields = [
  {
    field:  "name",
    key:    "name",
    type:   "edit",
    sort:   1,
    search: true,
  },

  {
    field: "office",
    key: "office",
    type: "text",
    sort: 1,
    search: true,
  }
]

const query = [
    {string : "", fields: fields },
    {string : "!city", fields: fields },
    {string : "city", fields: fields },
    {string : "city;town", fields: fields },
    {string : "city+town", fields: fields },
    {string : "city+!town", fields: fields },
];



/* expected result object */
const checkQuery = [
    {},

    {$nor:[{name:{$regex:".*city.*","$options":"i"}},{office:{$regex:".*city.*",$options:"i"}}]},

    {$or:[{name:{$regex:".*city.*",$options:"i"}},{office:{$regex:".*city.*",$options:"i"}}]},

    {$or:[
        {$or:[{name:{$regex:".*city.*",$options:"i"}},{office:{$regex:".*city.*",$options:"i"}}]},
        {$or:[{name:{$regex:".*town.*",$options:"i"}},{office:{$regex:".*town.*",$options:"i"}}]}
      ]
    },

    {$and:[
      {$or:[
          {name:{$regex:".*city.*",$options:"i"}},
          {office:{$regex:".*city.*",$options:"i"}}
        ]},
      {$or:[
          {name:{$regex:".*town.*",$options:"i"}},
          {office:{$regex:".*town.*",$options:"i"}}
        ]}
      ]
    },

    {$and:[
        {$or:[
            {name:{$regex:".*city.*",$options:"i"}},
            {office:{$regex:".*city.*",$options:"i"}}
            ]
        },
        {$nor:[
            {name:{$regex:".*town.*",$options:"i"}},
            {office:{$regex:".*town.*",$options:"i"}}
            ]
        }
        ]
    }
];

import assert from "assert";
import {buildQuery} from "../func-buildQuery";
describe("ListCollections - function buildFilter", function () {

  it("function buildQuery", function () {
    query.forEach( (item, idx) => {
      let out = buildQuery(item.string, item.fields);
      assert.deepStrictEqual(out, checkQuery[idx], `Result at index ${idx} was ${JSON.stringify(out)}.`);
    });
  });

});
