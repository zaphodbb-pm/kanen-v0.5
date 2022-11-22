/**
 * Configuration for AdminPanel Components.
 *
 * @function adminPanel_text
 * @memberOf Pages:adminPanel
 * @locus Client
 *
 * @property {Object} pageConfig - {components, widgets}
 *
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
            icon: "",
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
            icon: "",
            image: "/images/report-frog-luggage.jpg",
            alt: "Frog with luggage",
            type: "secondary"
        },

        gauge1: {
            gauge: "donut",
            type: "primary",
            isRelative: true
        },

        gauge2: {
            gauge: "ring",
            type: "tertiary",
            isRelative: false,
            lowThreshold: 20,
            highThreshold: 50
        },

        gauge3: {
            gauge: "meter",
            type: "secondary",
            isRelative: false
        },

        charts1: {
            type: "column",
            modifiers: "show-caption show-labels show-values show-grid",
            showLegend: false
        },

        charts2: {
            type: "donut",
            modifiers: "has-buffer show-caption",
            showLegend: true
        },

        charts3: {
            type: "line",
            modifiers: "show-caption show-labels show-values show-grid",
            showLegend: false
        },

        charts4: {
            type: "line",
            modifiers: "multiple show-caption show-labels show-grid",
            showLegend: true
        }
    }
};
