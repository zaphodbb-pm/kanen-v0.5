/**
 * Nav label for ExportImport page.
 *
 * @memberOf Pages:exportImport
 * @name exportImport_nav
 * @lends exportImport
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Export Import"};

export const link = "/exportImport";

export const icon = "icon-bg-cloud-download";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["administrator"],
    write: ["administrator"]
}
