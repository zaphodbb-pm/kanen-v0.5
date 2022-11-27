/**
 * Abstracts the database get of documents.
 *
 * @function getDocs
 * @memberOf Functions:application:
 * @locus Client
 *
 * @param {String} coll - name of collection to get data from
 * @param {String} type - type of operation to perform: 'list', 'allFields', 'oneList', 'oneAllFields', 'select', 'content', 'count'
 * @param {Object} search - standard MongoDB query object
 * @param {Object} options - standard MongoDB option add-on
 *
 * @return {Array|Object}
 *
 * @notes
 *   1.  By abstracting the data getting layer, we can adjust for changes to any other database or framework if needed.
 *
 */


// @ts-ignore
import { Meteor } from 'meteor/meteor'


export async function getDocs(coll, type, search, options) {
    let method = type === "combo" ? "getCollDataCombo" : "getCollData";

    try {
        return await Meteor.callAsync(method, coll, type, search, options);
    } catch (error) {
        console.warn("getDocs", coll, search, options, error);
        return [];
    }
}
