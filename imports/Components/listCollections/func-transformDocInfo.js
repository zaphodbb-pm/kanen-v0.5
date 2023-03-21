/**
 * Common routine to calculate MongoDB filters to streamline search.
 *
 * @function transformDocInfo
 * @memberOf Components:listCollections:
 * @locus Client
 *
 * @param {String} coll - name of collection for the retrieved documents
 * @param {Object} doc - document information
 * @param {Array} fields - array of objects that describe what fields to display in listing
 *
 * @return {Array} - Array of document objects ready for listing
 *
 */
import {dotNotation} from "../../Functions/utilities/dotNotation";
import {timeAgo} from "../../Functions/formatters/timeAgo";


export function transformDocInfo(coll, doc, fields){
    let tr = [];
    let values = {...doc};

    //*** create a set of initials if a "name" field exists
    let name = "az";
    if (doc.name) {
        name = createInitials(doc.name);
    }

    fields.forEach(function (field) {
        let val = dotNotation(values, field.key);

        switch(true){

            //*** "users" is a special case
            case coll === "users" && field.key === "emails":
                val = val && val[0] ? val[0].address : "ex@example.com";
                break;

            case field.key === "tag":
                val = values.data && values.data.event ? values.data.event : val;
                break;

            case ["updatedAt", "createdAt", "data.time", "timeStamp"].includes(field.key):
                val = timeAgo(val);
                break;

            case field.type === "object":
                val = val ? JSON.stringify(val).replace(/,/g, ", ") : "";
                break;
        }

        let base = field?.base ?? "";

        tr.push({
            id: values._id,
            type: field.type,
            value: val,
            base: base,
            url: base + val,
            prefix: field?.prefix ?? "",
            suffix: field?.suffix ?? "",
            name: name,
        });
    });

    return tr;
}

function createInitials(name) {
    let parts = name.trim().split(" ");
    let part1a = parts[0] ? parts[0].charAt(0).toUpperCase() : "";
    let part1b = parts[0] ? parts[0].charAt(1) : "";
    let part2 = parts[1] ? parts[1].charAt(0).toUpperCase() : "";

    return part1a + (part2 ? part2 : part1b);
}
