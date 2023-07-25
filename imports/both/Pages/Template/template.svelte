<script>

    /**
     * Template page provides a simple starting point for adding and customizing your own pages.
     *
     * @name template
     * @module
     * @memberOf Pages:template
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
        import {header, page} from './template_text';
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
        console.log("template page destroyed");
    });




</script>



<PageHeader header="{pageHeader}" />


<main class="main-content">

    <!-- actual page content or Components -->
    <h2 data-tp_heading>{text.examples}</h2>

    <div class="row" data-tp_main>
        <div class="column">
            <div>{message} {textWithout}</div>
            <div>{@html message} {textWith}</div>
        </div>

        <div class="column">
            <div class="box-shadow">
                {@html i18n(page.components, "box", $lang).msg}
            </div>
        </div>
    </div>
</main>
