/**
 * Example file that abstracts logic from a svelte component.
 *
 * @memberOf Functions
 * @function injectText
 * @locus client
 *
 * @return {object} - {bold, normal, without, with}
 */

export function injectText() {
    return {
        bold: "template page",
        normal: "mounted",
        without: "without @html",
        with: "with @html"
    };
}
