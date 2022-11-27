import {Meteor} from "meteor/meteor";
import {sortBy} from "../../Functions/utilities/sortBy.js";
import {groupBy} from "../../Functions/utilities/groupBy";

Meteor.methods({

    /**
     * Meteor method to scan for svelte files and build documentation.
     *
     * @function buildSvelteJsdoc
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns nothing
     *
     */

    buildSvelteJsdoc: function () {
        let fs = require('fs');
        const dirTop = "imports";

        //* get full path to active meteor directory
        let rpath = fs.realpathSync("./");
        rpath = rpath.split(".meteor")[0];

        let svelte = walk(rpath + dirTop, "svelte");
        console.log("svelte: found files = ", svelte.length);

        svelte.forEach( (sv) => {
            let readFile = fs.readFileSync( sv, "utf8");
            let pattern = /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g;
            let test = readFile.match(pattern);


            //console.log("test", typeof test, sv );

            if(test){
                fs.writeFileSync(sv.replace("svelte", "jsdoc"), test[0]);
            }
        })

        console.log("buildSvelteJsdoc finished");
    },


    /**
     * Meteor method to get formatted documentation.
     *
     * @memberOf Server:Methods:
     * @function fetchDocumentation
     * @isMethod true
     * @locus Server
     *
     * @returns {Array} of objects {label, list}
     */

    fetchDocumentation: function () {

        if (Meteor.settings.require_documentation) {

            try {
                let documentation =  JSON.parse( Assets.getText("documentation.json") ?? "[]" );
                return reformatDoc(documentation);
            } catch (err) {
                console.log("err", err);
            }
        }
    },


    /**
     * Meteor method to scan for svelte generated jsdoc file and remove them.
     *
     * @function removeSvelteJsdoc
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns nothing
     */

    removeSvelteJsdoc: function () {
        let fs = require('fs');
        const dirTop = "imports";

        //* get full path to active meteor directory
        let rpath = fs.realpathSync("./");
        rpath = rpath.split(".meteor")[0];

        let svelte_jsdoc = walk(rpath + dirTop, "jsdoc");
        console.log("svelte_jsdoc: found files = ", svelte_jsdoc.length);

        svelte_jsdoc.forEach( (sv) => {
            fs.unlinkSync(sv);
        })

        console.log("removeSvelteJsdoc finished");
    },



    /**
     * Uses Meteor-jsdoc data file to display project documentation in the project itself.
     *
     * @function buildDocumentation
     * @memberOf Server:Methods:
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} jsdoc - fields of documentation values
     *
     * @example
     *  description: 'Main entry point for client code.\nAll common routines are imported here.',
     *  memberof: 'Client',
     *  kind: 'module',
     *  name: 'main',
     *  fires: [ 'onSelect with {id ,event: name}' ],
     *  listens: [ 'event:onSelect' ],
     *  see: [ '"Try this {@link http://github.com|GitHub} on for size"' ],
     *
     *  params:[ {
     *          type: [Array],
     *          description: 'some value',
     *          name: 'test',
     *          typeString: 'Object' },
     *          description: 'some string value',
     *          name: 'string',
     *          typeString: 'String' } ],
     *
     *  returns:[ {
     *          type: [Array],
     *          description: 'whynot - some other value',
     *          typeString: 'Object' } ],

     *  examples: [ 'a new example' ],
     *  scope: 'static',
     *  longname: 'Structure.main',
     *  istemplate: 'true',
     *  locus: 'Client',
     *  notes: '1.  Key Session variables:\n         window  = dimensions of current viewport\n         resize  = reactive indicator (pulse) that a window resize has occurred and\n                   affected modules will need to update themselves\n         System  = reactive object holding key system parameters stored in the systemConfig collection',
     *  filename: 'main.test.js',
     *  lineno: 1,
     *  path: '/client',
     *  augments: null,
     *  import: '\'undefined\'',
     *  seeString:  [ {
     *          prefix: '"Try this',
     *          link: 'http://github.com',
     *          linkName: 'GitHub',
     *          suffix: 'on for size"'
     *          } ],
     *   eventActivity: true }
     *
     */


    buildDocumentation: function () {
        if (Meteor.settings.require_documentation) {
            let getDoc = JSON.parse( Assets.getText("raw-documentation.json") ?? "[]");

            let prunedDocs = getDoc.filter( (rd) => !rd["undocumented"] );

            let filteredDocs = prunedDocs.map( (rd) => {
                let temp = JSON.parse( JSON.stringify(rd));

                if (rd["tags"]) {
                    rd["tags"].forEach(function (item) {

                        if(item.title === "typescriptonly"){
                            item.value = true;
                        }

                        temp[item.title] = item.value ?? item.text ?? "";
                    });
                }

                delete temp["tags"];
                delete temp["comment"];

                return temp;
            });

            filteredDocs = filteredDocs.filter( fd => !fd["typescriptonly"] );

            let formattedDoc = JSON.stringify( formatDocumentation(filteredDocs) );

            // @ts-ignore
            let fs = Npm.require('fs');

            fs.writeFile(process.env["PWD"] + "/private/documentation.json", formattedDoc, "utf8",
                function (err) {
                    if (err) throw err;
                    console.log('File write json done!');
                }
            );

        console.log("buildDocumentation finished");
        }
    }
});





function walk(dir, extension) {
    let fs = require('fs');

    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(walk(file, extension));
            } else {
                /* Is a file */
                if(file.includes(extension)){
                    results.push(file);
                }
            }
    });
    return results;
}


function formatDocumentation(documentationFile) {
    let doc = documentationFile;
    let out = [];
    let path = process.env["PWD"];

    doc.forEach(function (item) {
        let temp = item;

        //** ignore items that do not have a file name
        if (!(item.meta && item.meta.filename)) {
            return
        }

        //** add in meta data
        temp.filename = item.meta && item.meta.filename ? item.meta.filename : "no filename";
        temp.filename = temp.filename.replace(".jsdoc", ".svelte");
        temp.lineno = item.meta && item.meta.lineno ? item.meta.lineno : "no line number";
        temp.path = item.meta && item.meta.path ? item.meta.path.replace(path, "") : "";

        //** check that memberof is filled
        temp.memberof = temp.memberof ? temp.memberof : temp.longname.split(".")[0];

        //** clean up main descriptive text
        if (temp.summary) {
            temp.summary = item.summary.replace(/<[^>]+>/g, '').trim();     // remove any html tags
            temp.summary = temp.summary.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
        }

        if (temp.description) {
            temp.description = item.description.replace(/<[^>]+>/g, '').trim();     // remove any html tags
            temp.description = temp.description.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
        } else {
            temp.description = temp.summary ? temp.summary : "No description";
        }

        //** prettify augments.  meteor-jsdocs stops string input when it finds a space.
        //** comments need to leave out spaces.  Add back in to make reading easier
        temp.augments = temp.augments && temp.augments.length > 0 ? temp.augments[0].replace(/\|/g, ", ") : null;

        //** Functions are only available to main routines and hence require a different import method
        if (temp && temp.memberof && temp.memberof.includes("Function")) {
            temp.import = `import {${temp.name}} from '${temp.path}/${temp.filename}'`;
        } else {
            temp.import = `'${temp.path}/${temp.filename}'`;
        }

        if (item && item.params && Array.isArray(item.params) && item.params.length > 0) {
            temp.params = item.params.map(function (parm) {

                parm.name = parm.name ? parm.name : "unknown";

                if (parm.description) {
                    parm.description = parm.description.replace(/<[^>]+>/g, '').replace(/\n/g, "").trim();
                } else {
                    parm.description = "";
                }
                parm.type = parm.type && parm.type.names ? parm.type.names : [];
                parm.typeString = parm.type.length > 0 ? parm.type.join(" | ") : "";

                return parm;
            });
        }

        /*
            "properties": [
      {
        "type": {
          "names": [
            "*"
          ]
        },
        "description": "<p>(required) item to validate</p>",
        "name": "variable"
      },
         */

        if (item && item.properties && Array.isArray(item.properties) && item.properties.length > 0) {
            temp.properties = item.properties.map(function (prop) {

                prop.name = prop.name ? prop.name : "unknown";

                if (prop.description) {
                    prop.description = prop.description.replace(/<[^>]+>/g, '').replace(/\n/g, "").trim();
                } else {
                    prop.description = "";
                }

                prop.type = prop.type && prop.type.names ? JSON.parse( JSON.stringify(prop.type.names) ) : [];
                prop.typeString = prop.type.length > 0 ? prop.type.join(" | ") : "";

                return prop;
            });
        }

        if (item.returns && Array.isArray(item.returns) && item.returns.length > 0) {
            temp.returns = item.returns.map(function (ret) {
                ret.description = ret.description ? ret.description.replace(/<[^>]+>/g, '').replace(/\n/g, "").trim() : "";
                ret.type = ret.type && ret.type.names ? ret.type.names : [];
                ret.typeString = ret.type.length > 0 ? ret.type.join(" | ") : "";

                return ret;
            });
        }

        //** re-format any @links as an object
        if (item.see && Array.isArray(item.see) && item.see.length > 0) {

            temp.seeString = item.see.map(function (str) {

                // parse a string like: "Try this {@link http://github.com|GitHub} on for size"
                if (str && str.length > 0 && str.includes("@link")) {
                    let temp = str.split("{");              // [prefix, rest]
                    let prefix = temp[0] ? temp[0].trim() : "";

                    temp = temp[1].split("}");              // [rest, suffix]
                    let suffix = temp[1] ? temp[1].trim() : "";

                    temp = temp[0].split("|");              // [link, linkName]
                    let link = temp[0] ? temp[0].replace("@link", "").trim() : "";
                    let linkName = temp[1] ? temp[1].trim() : link;

                    return {
                        prefix: prefix,
                        link: link,
                        linkName: linkName,
                        suffix: suffix
                    };
                } else {
                    return {
                        prefix: '',
                        link: '',
                        linkName: str,
                        suffix: ''
                    };
                }
            });
        }

        //** convert underscores into space.  Jsdoc stops at first space hence spaces between words start as _
        if (temp.requires && Array.isArray(item.requires) && temp.requires.length > 0) {
            temp.requires = item.requires.map(function (req) {
                return req.replace("_from_", " from ").replace("module:", "");
            });
        }

        //** flag that events are being used
        let fires = temp.fires && temp.fires.length > 0 ? temp.fires : null;
        let listens = temp.listens && temp.listens.length > 0 ? temp.listens : null;
        temp.eventActivity = !!(fires || listens);

        out.push(temp);
    });

    return out;
}


//* re-package documentation for display as paged content
function reformatDoc(res){
    let content = [];

    if (res && res.length > 0) {
        let list = Object.entries( groupBy(res, "memberof") );

        //** prepare documentation for insertion into an accordion component
        let out = list.map(function (li) {
            return {
                label: li && li[0] ? li[0] : "n/a",
                list: li && li[1] ? li[1] : []
            }
        });

        //** sort topic and the body of a topic
        out = sortBy(out, "label",1);

        out = out.map((topic) => {
            topic.list = sortBy(topic.list, "name", 1);
            return topic;
        });

        content = out;
    }

    return content;
}
