/**
 * Writes a log to a collection.
 *
 * @function writeLog
 * @memberOf Server:Functions:
 * @locus Server
 *
 * @param {String} logName
 * @param {Object} data
 *
 *
 *
 * @return nothing - writes log to collection
 *
 */

import {LogsUser, LogsSystem, LogsSensor} from "../../both/collectionDefs";

export function writeLog(logName, data) {
    const now = new Date();
    const dateParts = {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        day: now.getDay(),
        hour: now.getHours()
    };

    let doc = {
        tag: logName,
        createdAt: now,
        timeStamp: now.getTime(),
        date: dateParts,
        data: data
    };

    let status;

    switch (logName) {

        case "LogsUser":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsUser.insert(doc);
            break;

        case "LogsSystem":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsSystem.insert(doc);
            break;

        case "LogsSensor":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsSensor.insert(doc);
            break;

        default:
            status = {status: 400, msg: "Invalid collection to write to", log: logName};
            console.log("writeLog default", status, doc);
    }

    return status;
}
