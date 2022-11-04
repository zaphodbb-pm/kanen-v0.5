/**
 * DOM walking utilities modeled on @testing-library.
 * testing-library has a more complex work flow than is needed as
 * Svelte compiler with SSR provides quicker and more direct access to the DOM
 *
 * @memberOf Tests
 * @function domUtilities
 * @locus Server
 *
 * @see {@link https://testing-library.com/|@testing-library}
 *
 * @param {Object} getAttribute - finds attribute for a given element
 * @param {Object} getAttribute.dom - jsdom format html
 * @param {String} getAttribute.element - html tag name
 * @param {String} getAttribute.attribute - html element attribute name
 *
 * @export checkDOM - utility functions {getAttribute}
 */


//* add require function for getting modules
//import { createRequire } from 'module'
//const require = createRequire(import.meta.url);


export const checkDOM = {
    getAttribute: (dom, element, attribute) => {
        return dom.querySelector(element).getAttribute(attribute);
    }
}
