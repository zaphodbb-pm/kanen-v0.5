/**
 * Format time as 'ago' format from now; used by document listing table.
 *
 * @memberof Functions
 * @function timeAgo
 * @locus Anywhere
 *
 * @param {Object} timeIn - Date object
 *
 * @return {string} - relative time from now to 'time'
 *
 */

export function timeAgo(timeIn) {

    let time = timeIn ? timeIn : new Date(10000000);             // make sure that time is defined
    time = time && time.constructor === Object ? time: new Date(time); // convert number to date object

    let now = new Date();
    let seconds =  (now.getTime() - time.getTime());            // milliseconds since last update
    seconds = Math.floor(seconds / 1000);                       // seconds since last update
    let intervalType;

    let interval = Math.floor(seconds / 31536000);              // figure "time ago" values
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return `${interval} ${intervalType} ago`;
}

export const testPlan = {
    label: "function timeAgo",

    tests:  [
        {test: "seconds ago", args: [new Date(Date.now() - 1000 * 10)], type: "strictEqual", result: "10 seconds ago"},
        {test: "minutes ago", args: [new Date(Date.now() - 1000 * 180)], type: "strictEqual", result: "3 minutes ago"},
        {test: "hours ago", args: [new Date(Date.now() - 1000 * 3600 * 4)], type: "strictEqual", result: "4 hours ago"},
        {test: "days ago", args: [new Date(Date.now() - 1000 * 3600 * 24 * 2)], type: "strictEqual",  result: "2 days ago"},
        {test: "months ago", args: [new Date(Date.now() - 1000 * 3600 * 24 * 60)], type: "strictEqual",  result: "2 months ago"},
        {test: "years ago", args: [new Date(Date.now() - 1000 * 3600 * 24 * 31 * 12 * 2)], type: "strictEqual", result: "2 years ago"},
    ]
}
