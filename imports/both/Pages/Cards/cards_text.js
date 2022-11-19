/**
 * @summary Labels for Cards.
 *
 * @memberOf Pages:cards
 * @function cards_text
 * @locus Client
 *
 * @returns {Object}
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Card Page",
        subtitle:   "Card layout examples.",
        body: "See <a href='https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-Components/card.html' target='_blank'>Cards</a> " +
            "for more details. <br><br>" +
            "Cards can emit an event from the footer button (footEvent).<br>  " +
            "The footEvent is captured by the parent and alerted as cardEvent. <br>"
    }
};


export const page = {
    headings: {
        en: {
            heading1: "Example With Image But No Title",
            heading2: "Example With Title and Footer Only"
        }
    },


    components: {

        en: {
            cardOne: {
                title: null,
                subtitle: null,
                body: "Hello World",
                image: "/default-test-image.jpg",
                altImage: "Soulful looking puppy",
                footer: null
            },

            cardTwo: {
                title: "Card Title",
                subtitle: "Card Sub-Title",
                body: "Another View",
                image: null,
                footer: [
                    {class: "is-primary has-hover", text: "Save"},
                    {class: "is-danger-outlined has-hover", text: "Delete"},
                ]
            }
        }
    }
};
