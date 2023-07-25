/**
 * Get editor plugins and other components.
 *
 * @function editorPlugins
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Promise} - grouped button sets
 *
 * @notes
 *
 */


export async function editorFiles() {
    await import("trumbowyg/dist/trumbowyg");
    await import("trumbowyg/dist/plugins/table/trumbowyg.table");
    await import("trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize");
    await import("trumbowyg/dist/plugins/base64/trumbowyg.base64");
    await import("trumbowyg/dist/plugins/indent/trumbowyg.indent");
    await import("trumbowyg/dist/plugins/preformatted/trumbowyg.preformatted");
    await import("trumbowyg/dist/plugins/template/trumbowyg.template");
    await import("trumbowyg/dist/plugins/cleanpaste/trumbowyg.cleanpaste");
}
