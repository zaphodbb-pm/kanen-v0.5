/**
 * DOM walking utilities modeled on @testing-library.
 * testing-library has a more complex work flow than is needed as
 * Svelte compiler with SSR provides quicker and more direct access to the DOM
 *
 *
 * @memberOf Tests
 * @function domBuild
 * @locus Server
 *
 * @see {@link https://testing-library.com/|@testing-library}
 *
 * @param {string} compLink - path to component
 * @param {Object} options - props values to inject into component
 *
 * @module buildDOM - converts Svelte compiled object into DOM {component, options}
 */


//* add require function for getting modules
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

require('svelte/register');     // provides svelte render function

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export const buildDOM = function(compLink, options){
    const App = require(compLink).default;
    const obj = App.render(options);

    const body = `<!DOCTYPE html>${obj.html}`
    const domStart = new JSDOM(body, { resources: "usable", runScripts: "dangerously" });

    return domStart.window.document;
}
