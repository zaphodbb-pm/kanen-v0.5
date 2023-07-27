/**
 * Server side setup of Access Control List for special collections: notifications and authors.
 *
 * @function specialACL
 * @memberOf Server:
 * @locus Server
 *
 * @property {Object} authors_acl
 */


export const authors_acl =  {
    authors: {
        coll: "users",
        roles: {
            read: ["basic", "standard", "pro", "siteAdmin"],
            write: ["none"]
        },

        listLong: {
            username: 1,
            profile: 1,
            role: 1,
            emails: 1,
            active: 1,
            updatedAt: 1
        },
    }
};