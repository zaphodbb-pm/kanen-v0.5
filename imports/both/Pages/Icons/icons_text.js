/**
 * Text for Icons page.
 *
 * @name icons_text
 * @constant {Object}
 * @memberOf Pages:icons
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components}
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Icons Page",
        subtitle:   "",
        body:   "CSS controlled svg icons set in HTML background.  Sizes are nominally 1rem, 1.27rem, 1.42rem and 1.8rem.<br>" +
            "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/icons.html' target='_blank'>CSS website</a> " +
            "for more details"}
};


export const page = {

    page: {
        count: {en: "Total number of icons: "},
        example: {en: "Example size and colour settings for icons. "}
    },

    components: {
        list: {
            name: {en: "Name"}
        },

        form: {
            name: {en: "Name"}
        },

        widget: {
            title: {en: "Title"}
        }
    }
};
