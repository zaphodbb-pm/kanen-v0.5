/**
 * Extends the MongoDb projection objects for various read requests.
 *
 * @function fieldAddons
 * @memberOf Server:
 * @locus Server
 *
 * @returns {Object} - fieldAddons: {updatedAt, author, authorName, authorFullName, group, tenantId}
 */

export const fieldAddons =  {
    updatedAt: 1,
    author: 1,
    authorName: 1,
    authorFullName: 1,
    group: 1,
    tenantId: 1,
}
