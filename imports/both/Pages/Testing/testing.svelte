<script>
    /**
     * Testing page provides an overview of the structure and methods to test this project.
     *
     * @name testing
     * @module
     * @memberOf Pages:testing
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     * @notes
     *  1. Main code for page control: page boilerplate and page body sections.
     *  2. Common page boilerplate has two props: currentRoute and params from spa-router for rendering.
     *  3. Common page boilerplate imports common PageHeader component.
     *  4. Common page boilerplate injects language responsive text into "header" and "page".
     *  5. Page-body contains specific code and html for this page's functionality.
     */

     //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute = "";
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {lang} from '/imports/client/systemStores';
        import {i18n} from '/imports/Functions/utilities/i18n';
        import {header, page} from './testing_text';
        const pageHeader = i18n(header, "", $lang);
        const text = i18n( page, "page", $lang);

        //** app support files
        import { onMount, onDestroy } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

     //* end of page boilerplate *************************************



    //* page-body support **************************

    //** page-body Functions *************************
    import {injectText} from "./functions/injectText";


    //** page controls / logic ***********************
    let message = "";
    let textWith = "";
    let textWithout = "";



    onMount(() => {
        const text = injectText();
        textWith = text.with;
        textWithout = text.without;
        message = `<b>${text.bold}</b> ${text.normal}`;
    });

    onDestroy(() => {
        console.log("testing page destroyed");
    });

</script>



<PageHeader header="{pageHeader}" />


<main class="main-content">

    <h2>{text.heading1}</h2>

    {@html text.preamble}

    <div class="space-block-vert">
        <div class="row">
            <div class="column">
                <h3>{text.heading11}</h3>
                <ul>
                    {#each text.items1 as item}
                        <li style="margin-bottom: 2rem;">{@html item}</li>
                    {/each}
                </ul>
            </div>

            <div class="column">
                <h3>{text.heading12}</h3>
                <ul>
                    {#each text.items2 as item}
                        <li style="margin-bottom: 2rem;">{@html item}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

</main>
