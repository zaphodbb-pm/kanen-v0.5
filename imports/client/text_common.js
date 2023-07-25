/**
 * System-wide common language strings.
 *
 * @name text_common
 * @memberOf App
 * @locus Client
 *
 * @property {Object} default - {userLangs, currencies, confirmDelete, fileReader, calendar}
 *
 *
 */

export default{
    userLangs: {
        en: [
            {_id: "all", name: "All Languages"},
            {_id: "en",  name: "English"},
            {_id: "fr",  name: "Francais"},
            {_id: "es",  name: "Espaniol"},
        ]
    },

    currencies: {
        en: [
            {_id: "usd", name: "US Dollars"},
            {_id: "cad", name: "CDN Dollars"},
            {_id: "euro", name: "Euro"},
            {_id: "mex", name: "Peso"},
        ]
    },

    confirmDelete: {
        en: {
            msg: "Are you sure you want to delete?",
            btnRemove: "Remove",
            btnCancel: "Not now!"
        }
    },

    fileReader: {
        en: {
            file_too_long: "Can't load files larger than getImageSizeKB.  <br/>Size = ",
            file_wrong_type: "File type is not supported.  <br/>Type = ",
        }
    },

    notesText: {
        en: {
            title: "Add or Edit Your Notes",
            save: "Save Changes",
            remove: "Remove Note",
            fieldName: {label: "Note"},
            noUser: "Your notes can not be accessed.  <br><br>You are not signed in or do not have an account."
        }
    },
}

