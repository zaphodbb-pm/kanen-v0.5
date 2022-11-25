// @ts-nocheck
/**
 * Isomorphic routine that lets a server console message to be sent to the browser console for display.
 * This package is for development work that needs to get server logs.
 * This is also helpful on a staging server to help with any debugging work.
 *
 * @function showServerConsole
 * @memberOf Structure:server
 * @locus Anywhere
 *
 * @param {string} label - is used as the title of this log
 * @param {object} data - {key1: value1, key2: value2, ...} data to be formatted and shown in client browser console
 * @param {boolean} enabled - let server logs flow to client browser
 *
 * @see This package is based on {@link https://github.com/aldeed/meteor-console-me/blob/master/console-me.js|meteor-console-me}
 *
 * @notes
 *
 *
 */


if (Meteor.isServer) {
    let sharedConsole = new Mongo.Collection('_console', {connection: null});

    global.showServerLogs = function(label, data, enabled){
        if(enabled){
            const msg = {
                label: label,
                data: JSON.stringify(data),
                createdAt: Date.now()
            }
            sharedConsole.insert(msg);
        }
    }

    Meteor.publish("_console", function() {
        let self = this;
        let initializing = true;
        let handle = sharedConsole.find().observe({
            added: function(doc) {
                if (!initializing) {
                    self.added("_clientConsole", doc._id, doc);
                    sharedConsole.remove({_id: doc._id});
                }
            }
        });
        initializing = false;
        self.ready();

        // Stop observing the cursor when client unsubs.
        self.onStop(function() {
            handle.stop();
        });
    });
}



if (Meteor.isClient) {
    global.serverConsole = {};
    let sharedConsole = new Mongo.Collection('_clientConsole');

    sharedConsole.find().observe({
        added: function(doc) {
            let time = new Date(doc.createdAt);
            time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`

            //** define display styling
            const css = {
                title: "color: #FFFFFF; background-color: #9400D3; line-height: 1.2;",
                label: "color: blue; font-weight: bold;",
                text: "color: inherit;",
            }

            //** build message title with css styling
            let args = [`\n\n%c ${doc.label} %c from Server @${time}`];
            args.push(css.title, css.text);

            //** add message data and activate console
            args.push(JSON.parse(doc.data));
            console.log.apply(console, args);
        }
    });

    let subHandle;
    serverConsole.subscribe = function serverConsoleSubscribe() {
        subHandle = Meteor.subscribe("_console");
    };

    serverConsole.unsubscribe = function serverConsoleUnsubscribe() {
        subHandle && subHandle.stop();
        subHandle = null;
    };
}