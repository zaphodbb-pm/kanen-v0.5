<script>
    /**
     * @summary Layout for Documentation page.
     *
     * @name documentation
     * @module
     * @memberOf Pages:documentation
     * @locus Client
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
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    const pageHeader = i18n(header, "", $lang);
    setContext("pageText", page);

    import Accordian from '/imports/Components/widgets/accordian.svelte';
    import Paged from '/imports/Components/widgets/pagedContent.svelte';

    let result = [];
    let content = [];
    let tabSettings = "is-light is-fullwidth justify-content-start";
    let eventMain = "doc-main-topic";
    let eventSub = "doc-subtopic";
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
    });


    //* switch categories and topics
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

            <div class="level">
                <button class="button is-primary is-outlined" on:click={getSvelte}>
                    {i18n(page.components, "btnJsdoc", $lang)}
                </button>

                <button class="button is-primary is-outlined" on:click={buildDocumentation}>
                    {i18n(page.components, "btnGetDocs", $lang)}
                </button>
            </div>

        </div>
    </div>

    <div id="documentation-list">
        <div class="row">
            <div class="column span-1">
                <Accordian {tabSettings} text="{content}" {eventMain} {eventSub}
                           on:doc-main-topic="{changeBody}" on:doc-subtopic="{changeSub}"/>
            </div>

            <div class="column span-3">
                <Paged {content} {newCategory} {newTopic} />
            </div>
        </div>
    </div>

</main>