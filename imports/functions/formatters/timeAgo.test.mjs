/**
 * Test plan
 *
 * @memberof Tests
 * @augments timeAgo
 * @locus Anywhere
 *
 */


const now = Date.now();

export const testPlan = {
    label: "function timeAgo",

    tests:  [
        {   test: "seconds ago",
            args: [new Date(now - 1000 * 10)],
            type: "strictEqual",
            result: "10 seconds ago"
        },

        {   test: "minutes ago",
            args: [new Date(now - 1000 * 180)],
            type: "strictEqual",
            result: "3 minutes ago"
        },

        {   test: "hours ago",
            args: [new Date(now - 1000 * 3600 * 4)],
            type: "strictEqual",
            result: "4 hours ago"
        },

        {   test: "days ago",
            args: [new Date(now - 1000 * 3600 * 24 * 2)],
            type: "strictEqual",
            result: "2 days ago"
        },

        {   test: "months ago",
            args: [new Date(now - 1000 * 3600 * 24 * 60)],
            type: "strictEqual",
            result: "2 months ago"
        },

        {   test: "years ago",
            args: [new Date(now - 1000 * 3600 * 24 * 31 * 12 * 2)],
            type: "strictEqual",
            result: "2 years ago"
        },
    ]
}
