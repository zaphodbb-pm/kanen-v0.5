/**
 * @summary Labels for Icons page.
 *
 * @memberof Pages:Icons
 * @function icons_text
 * @locus Client
 *
 * @returns {Object}
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
