/**
 * @summary Configuration for AdminPanel components.
 *
 * @memberOf Pages:adminPanel
 * @function adminPanel_text
 * @locus Client
 *
 * @returns {Object}
 */




export const pageConfig =  {

    components: {},

    widgets: {

        reportbox1: {
            //isProgress: false,
            //image: "",
            //alt: "",
            icon: "icon-bg-music",
            //lowThreshold: 25,
            //highThreshold: 70,
        },

        reportbox2: {
            isProgress: true,
            image: "/images/report-teddy-bear-music.jpg",
            alt: "Teddy bear",
            //icon: "",
            lowThreshold: 20,
            highThreshold: 50,
        },

        infobox1: {
            icon: "icon-bg-settings",
            //image: "",
            //alt: "",
            type: "primary"
        },

        infobox2: {
            //icon: "",
            image: "/images/report-frog-luggage.jpg",
            alt: "Frog with luggage",
            type: "secondary"
        }

    }
};
