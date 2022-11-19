/**
 * Labels for PubSub page.
 *
 * @memberOf Pages:pubSub
 * @function pubSub_text
 * @locus Client
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "PubSub Page",
        lead:   "Real Time Database Access with MongoDb Change Streams",
        body:   "This page has been set up to use Meteor's Publish / Subscribe capability to respond to " +
                "real time changes in a collection.  This page uses the collection 'RealTime' that is independently updated on a " +
                "three second interval with random values across all documents through a Method call.  The initial length of documents is 15, but this length " +
                "can be changed in the page code.  <br/><br />" +
                "The server side collection 'Publish' function is controlled by the 'ChangeStreams' function that accepts a pipeline array " +
                "and standard collection options.  The 'ChangeStreams' function watches the collection and sends chanegs through the 'Publish' channel " +
                "to the client side 'subscribe' end point.<br/><br/>" +
                "The page measures the time from server side document update to client side received change time in milliseconds.  " +
                "In development mode, for 15 documents with a local Mongo database, the change propagation time is 50 to 200 milliseconds.  " +
                "In production mode, expect to see a greater delay due to network latency and server load. ",
    }
};


export const page = {
    page: {
        en: {
            report: {
                interval: "Update timing interval (seconds): ",
                title: "Cumulative timing values",
                min: "Min",
                max: "Max",
                avg: "Avg",
                suffix: "milliseconds"
            },

            labels: {
                name: "Name",
                value: "Value",
                delay: "Delay"
            }
        }
    }
};
