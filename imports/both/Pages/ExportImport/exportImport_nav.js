/**
 * Nav label for ExportImport page.
 *
 * @memberof Pages:ExportImport
 * @name exportImport_nav
 * @lends exportImport
 * @locus Anywhere
 *
 * @exports {Object} - nav
 * @exports {String} - link
 * @exports {String} - icon
 * @exports {Object} - roles {read: [], write: []}
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
