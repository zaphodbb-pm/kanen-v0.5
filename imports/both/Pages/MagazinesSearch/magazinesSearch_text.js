/**
 * Text for MagazinesSearch page.
 *
 * @name magazinesSearch_text
 * @constant {Object}
 * @memberOf Pages:magazinesSearch
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Magazines Search",
        subtitle:   "Fine Cooking Archives.",
        body:   "<p>There are 4 archives for Fine Cooking magazines: </p>" +
            "<ul>" +
            "<li>PDF files are available for download from this website.  " +
            "<li>The archive maintained by the Fine Cooking Community on Facebook.  " +
            "This requires that you be a member of the group.</li>" +
            "<li>Meredith has enabled (for now) access to the Fine Cooking magazines on Zinio. No PDF download is available.</li>" +
            "<li>Archive.org (owners of the Wayback Machine) has archived the first 113 Fine Cooking issues.</li>" +
            "</ul>",
    }
};


export const page = {

    grid: {
        en: {

            systemPDF:  "Requiem Stored PDF File",

            pdfLink: "FC Community Drive",

            zinioLink:  "finecooking.zinioapps.com",

            archiveLink:  "archive.org",
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Magazines List",
                addNew: "Add New"
            },

            magazinesSearchSearchId: {
                label: "Item Id",
            },

            name: {
                label: "Title",
            },

            _id: {
                label: "Del",
            }
        }
    },
};
