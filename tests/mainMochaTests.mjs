/**
 * Main entry point for Mocha based testing for a Meteor project.
 * This file is designed for use with Webstorm IDE and runs in its own node.js
 * instance.
 *
 * @see {@link https://mochajs.org/#installation|for Mocha setup}
 * @see {@link https://www.jetbrains.com/help/webstorm/running-unit-tests-on-mocha.html#ws_mocha_before_you_start|for Webstorm config}
 *
 */


import assert from "assert";

//* track node version that we are using - should use most recent
const nodeV = process.version;
console.log("node version", nodeV);

//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);


describe("Check Setup Files", function () {
    it("system version", async function () {
        const version = await import("../imports/both/version.mjs");
        assert.strictEqual(version.default.APP_NAME, "Kanen");
        assert.strictEqual(version.default.VERSION, "0.2.5");
    });
});


//import { render } from '@testing-library/svelte'
//import Component from "svelte/types/compiler/compile/Component";
//import {SvelteComponent} from "svelte";



/*
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
} from '@testing-library/dom'

 */


//import pkg from '@testing-library/dom'

//console.log("pkg", pkg);

//import { render, fireEvent } from '@testing-library/svelte'



const fs = require('fs');

//const svelte = require('svelte/compiler');
//const Component = require('svelte/types/compiler/compile/Component')

//import {mainIcons} from "../imports/client/setup/systemIcons.mjs"
//const mainIcons = require("../imports/client/setup/systemIcons.mjs")
//console.log("iconHome", iconHome);

require('svelte/register');
const iconHome = require('../public/svg_to_js/home-solid.json');

const App = require('../imports/components/elements/icon.svelte').default;

const obj = App.render({ icon: iconHome });

console.log("icon length", iconHome.icon[4].length);
console.log("obj", obj.html);





//const source = fs.readFileSync('../imports/components/elements/icon.svelte');

const files = getTestFiles("/imports/components/elements", ".svelte");

let file = files.find( s => s.includes("icon") );


//console.log("files", files, file);


//const source = fs.readFileSync(file, 'utf8');

//console.log("source", source);

//const component = svelte.compile(source)?.js?.code ?? "";

//const component = svelte.compile(source);

//const rendered = render("", { icon: 'iconHome' })

//console.log("rendered", rendered);

//console.log("component", component);





/*
describe('shows proper heading when rendered', () => {
    const getByText = render(component, { name: 'World' })

    console.log("testing-library", getByText);

    //assert.ok( getByText('Hello World!') );
})

 */



/*

const ast = svelte.parse(source, {
    // options
});




// tracking references and dependencies
const component = new SvelteComponent(ast);

console.log("component", component);
*/



/*
import Icon from "../imports/components/elements/icon.svelte"
 */


/*
const { results } = render(
    component
    //{ ComponentOptions },
    //{ RenderOptions }
)

 */




//console.log("results", results);



//* get all test files in a directory, import and execute tests
const testFileExtension = ".test.mjs";

//** test functions
const directory = "/imports/functions"
const testsFound = getTestFiles(directory, testFileExtension);

console.log(`'${directory}' test files found = `, testsFound.length);

testsFound.forEach( tf => import(tf));



//*************** support functions ************

//* get test files in a target directory
function getTestFiles(dirTop, extension) {
    let fs = require('fs');

    //* get full path to top of active code directory
    const rpath = fs.realpathSync("./");

    //* extract all test files from key directories
    return walk(rpath +  dirTop, extension);
}


//* recursively walk a directory for test files
function walk(dir, extension) {
    let fs = require('fs');

    let results = [];
    let list = fs.readdirSync(dir);

    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            //* Recurse into a subdirectory
            results = results.concat(walk(file, extension));
        } else {
            //* Is a file
            if(file.includes(extension)){
                results.push(file);
            }
        }
    });
    return results;
}
