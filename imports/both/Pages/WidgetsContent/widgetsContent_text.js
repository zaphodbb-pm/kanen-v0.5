/**
 * @summary Labels for WidgetsContent.
 *
 * @memberOf Pages:widgetsContent
 * @function widgetsContent_text
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components}
 *
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Content Widgets",
        lead:   "A variety of tabbed and accordion content widgets",
        body:   "",
    }
};


export const page = {

    page: {
        en: {
            headingTabs: "Standard Tabs",
            headingAccordions: "Standard Accordions",

            bodyTabs: "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-Components/tabs.html' target='_blank'> " +
                "tabs configuration and control</a> for more details.",

            bodyAccordions: "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-Components/accordions.html' target='_blank'> " +
                "accordion configuration and control</a> for more details.",
        }
    },

    components: {
        en: {
            tabbed:
                [
                    {
                        icon: "icon-bg-music",
                        label: "Music",
                        text: "The <b>quick</b> brown fox jumped over the <em>lazy</em> black dog.",
                        style: "is-expander-primary"
                    },

                    {
                        icon: "icon-bg-film",
                        label: "Films",
                        text: "some second tab text",
                        style: "is-expander-secondary"
                    },

                    {
                        icon: "icon-bg-image",
                        label: "Pictures",
                        text: "Some pithy content talking about pictures.",
                        style: "is-expander-tertiary"
                    },

                    {
                        icon: "icon-bg-file",
                        label: "Docs",
                        text: "<p>Third tab has extra long text.  This is formed into sentences and maybe also paragraphs.</p></br>" +
                            "<p> <b>Note</b> that this area also supports html codes because we know the source is reliable.</p>",
                        style: "is-expander-danger"
                    },
                ]
        }
    }
};
