/**
 * System-wide search bar language strings.
 *
 * @name textSearch
 * @constant {Object}
 * @memberOf App
 * @locus Client
 *
 * @property {Object} default - {label, helpText}
 *
 */

export default{
    label: {
        en: "Search",
    },

    helpText: {
        en: "You can use simple text search across all fields.  " +
            "Note that a minimum of 3 letters or numbers are required for each search part. <br/><br/>" +
            "Compound 'and' searches are supported by separating terms with '+' or a space.  " +
            "Compound 'or' searches can be done by separating terms with ';'.  " +
            "You can also use '!' as a not operator to find items that do not contain a term.  " +
            "The operator precedence is NOT '!' then AND '+' then OR ';'. <br/><br/>" +
            "Example: <code>fc174+make;175+!make</code> will find all records with the string 'fc174' AND 'make' (as in 'Make It Tonight') " +
            "OR all records with the string '175' and NOT 'make'.  " +
            "This returns two sets of records with the defined term searches.  These are joined together to " +
            "create one list of items found.",
    }
}
