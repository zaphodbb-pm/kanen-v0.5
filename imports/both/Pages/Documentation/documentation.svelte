<script>
    /**
     * Documentation page displays code structure and provides component details.
     *
     * @name documentation
     * @module
     * @memberOf Pages:documentation
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};


        //** page specific text and configuration
        import {header, page} from './documentation_text'

        //** app support files
        import { setContext, onMount } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {Meteor} from 'meteor/meteor';
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    const pageHeader = i18n(header, "", $lang);
    setContext("pageText", page);

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //import Accordion from '/imports/Components/widgets/accordion.svelte';
    import DocNav from '/imports/Components/widgets/jsdocNav.svelte'
    import Paged from '/imports/Components/widgets/pagedContent.svelte';

    let result = [];
    let content = [];
    let newCategory = "Getting_Started";
    let newTopic = "";

    //* set up initial introductory information
    let preamble = [
        {
            icon: null,
            label: "Getting_Started",
            text: null,
            dbContent: null,
            list: [
                {name: "Set-Up", info: i18n(page.components, "documentation", $lang).setup},
                {name: "Considerations", info: i18n(page.components, "documentation", $lang).consider},
            ]
        }
    ];


    //* lifecycle
    onMount( async () => {
        let results = await Meteor.callAsync("fetchDocumentation");
        content = preamble.concat(results);


        console.log("content", content);
    });


    //* switch categories and topics
    let  currTab = content && content.length > 0 ? content[0].label : "";

    /*
    function changetab(tab) {
        currTab = tab;
        dispatch("doc_maintopic", tab);
    }

    function setContent(sub) {
        dispatch("doc_maintopic", sub);
    }

     */


    function changeBody(msg) {
        newCategory = msg.detail;
    }

    function changeSub(msg) {
        let el = document.getElementById(msg.detail);
        if(el){
            el.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
        }
    }

    function getSvelte(){
        console.log("getSvelte")
        Meteor.call("buildSvelteJsdoc");
    }

    function buildDocumentation(){
        console.log("buildDocumentation")

        Meteor.call("buildDocumentation");

        console.log("removeSvelteJsdoc")

        Meteor.call("removeSvelteJsdoc");
    }

</script>




<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="row">

        <div class="column">
            <div class="">
                {@html i18n(page.page, "howToUse", $lang)}
            </div>

            <div class="space-vert-medium">
                <div class="level">
                    <button type="button" class="is-primary-outlined" on:click={getSvelte}>
                        {i18n(page.components, "btnJsdoc", $lang)}
                    </button>

                    <button type="button" class="is-primary-outlined" on:click={buildDocumentation}>
                        {i18n(page.components, "btnGetDocs", $lang)}
                    </button>
                </div>
            </div>

        </div>
    </div>


    <div class="row has-2x-minwidth">
        <div class="column is-span-1">
            <DocNav text="{content}"  on:doc_maintopic="{changeBody}" on:doc_subtopic="{changeSub}"/>
        </div>

        <div class="column is-span-2">
            <Paged {content} {newCategory} {newTopic} />
        </div>
    </div>

</main>

