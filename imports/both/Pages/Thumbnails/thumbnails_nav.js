/**
 * Nav label for thumbnails page.
 *
 * @name thumbnails_nav
 * @memberOf Pages:thumbnails
 * @locus Anywhere
 *
 * @property {Object} nav - i18n link label text
 * @property {String} link - page link url
 * @property {String} icon - CSS icon class
 * @property {Object} roles  - access permission {read: [], write: []}
 *
 */


export const nav = {en: "Thumbnails Edit"};

export const link = "/thumbnails-edit";

export const icon = "icon-bg-image";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
// adding "author" to roles further filters docs to include only those authored by current user
export const roles = {
    read: ["siteAdmin", "administrator"],
    write: ["siteAdmin", "administrator"]
}
