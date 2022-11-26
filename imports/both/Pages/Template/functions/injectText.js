/**
 * Example file that abstracts logic from a svelte component.
 *
 * @function injectText
 * @memberOf Pages:template
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
