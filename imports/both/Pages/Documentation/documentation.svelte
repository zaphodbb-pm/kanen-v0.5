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
        import {i18n} from '/imports/Functions/utilities/i18n';
        import {lang} from '/imports/client/systemStores';
        import {header, page} from './documentation_text';

        //** app support files
        import { onMount } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {Meteor} from 'meteor/meteor';

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);


    console.log("setting", Meteor.settings.public)


    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import DocNav from './docNav.svelte'
    import Paged from './pagedContent.svelte';

    let result = [];
    let content = [];
    let newCategory = "Getting_Started";
    let newTopic = "";

    //* lifecycle
    onMount( async () => {
        content = await Meteor.callAsync("fetchDocumentation");
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

    {#if  Meteor.settings.public.allow_documentation_build}
        <div class="row">

            <div class="column" data-tp_commentary>
                {@html pageText.setup}
            </div>

            <div class="column" data-tp_list>
                <ol>
                    <li>
                        <div class="level">
                            <div style="flex-basis: 10rem; flex-grow: 2;">
                                {@html pageText.step1}
                            </div>

                            <button type="button" class="is-primary-outlined" on:click={getSvelte}>
                                {pageText.btnJsdoc}
                            </button>
                        </div>
                    </li>

                    <li>{@html pageText.step2}</li>

                    <li>
                        <div class="level">
                            <div style="flex-basis: 10rem; flex-grow: 2;">
                                {@html pageText.step3}
                            </div>

                            <button type="button" class="is-primary-outlined" on:click={buildDocumentation}>
                                {pageText.btnGetDocs}
                            </button>
                        </div>
                    </li>
                </ol>

            </div>
        </div>

        <div class="space-component-medium"></div>
    {/if}


    <div class="row has-2x-minwidth">
        <div class="column is-span-1" data-tp_docnav>
            <DocNav text="{content}"  on:doc-maintopic="{changeBody}" on:doc-subtopic="{changeSub}"/>
        </div>

        <div class="column is-span-2" data-tp_paged_content>
            <Paged {content} {newCategory} {newTopic} />
        </div>
    </div>

</main>

