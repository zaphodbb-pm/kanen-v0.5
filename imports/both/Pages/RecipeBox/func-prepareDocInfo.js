/**
 * Common routine to calculate MongoDB filters to streamline search.
 *
 * @function transformDocInfo
 * @memberOf Components:listCollections:
 * @locus Client
 *
 * @param {Object} doc - document information
 * @param {Array} fields - array of objects that describe what fields to display in listing
 *
 * @return {Array} - Array of document objects ready for listing
 *
 */
import {dotNotation} from "../../../Functions/utilities/dotNotation";
import {timeAgo} from "../../../Functions/formatters/timeAgo";


export function prepareDocInfo(doc, fields){
    //** prepare document for display listing and get info for each field to display
    let tr = {};
    let values = {...doc};

    fields.forEach(function (field) {
        let val = dotNotation(values, field.key);

        switch(true){

            case !!val && field.type === "tag":
                val = values.data && values.data.event ? values.data.event : val;
                break;

            case !!val && ["updatedAt", "createdAt", "data.time", "timeStamp"].includes(field.key):
                val = timeAgo(val);
                break;

            case !!val && field.type === "object":
                val = val ? JSON.stringify(val).replace(/,/g, ", ") : "";
                break;
        }

        tr[field.key] = {
            id: values._id,
            type: field.type,
            value: val,
            key: field.key,
            keyName: field.label,
        };
    });

    return tr;
}