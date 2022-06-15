<script>
    /**
     * Layout for Template page.
     *
     * @memberof Pages:Template
     * @function template
     * @locus Client
     *
     * @notes
     *  1. Main code for page control: page boilerplate and page body sections.
     *  2. Common page boilerplate has two props: currentRoute and params from spa-router for rendering.
     *  3. Common page boilerplate imports common page header component used by PageWrapper.
     *  4. Common page boilerplate injects language responsive text into "pageHdr" and "pageText" contexts by PageWrapper.
     *  5. Common page boilerplate injects page component configs into "pageConfig" context by PageWrapper.
     *  6. Page-body contains specific code and html for this page's functionality.
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './template_text'
        import {pageConfig} from './template_config'

        //** app support files
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/utilities/i18n'

    let message = "";
    let text = i18n( page, "page", $lang);

    onMount(() => {
        message = "<b>template page</b> mounted";
    });

    onDestroy(() => {
        console.log("template page destroyed");
    });

</script>



<PageHeader header="{header}" />


<div class="main-content" id="page-layout">

    <h2>Examples</h2>

    <div class="row">
        <div class="column">
            <div>{message}</div>
            <div>{@html message}</div>
        </div>

        <div class="column">
            <div class="box">
                {@html i18n(page.components, "box", $lang).msg}
            </div>
        </div>
    </div>

    <hr>

    <div class="row">
        <article class="column">
            <h2></h2>
        </article>

        <article class="column">
            <h2></h2>
        </article>
    </div>


    <h2>{text.props}</h2>

    <div class="row">
        <article class="column">
            <h2>{text.route}</h2>
            <pre><code>{JSON.stringify(currentRoute, null, 4)}</code></pre>
        </article>

        <article class="column">
            <h2>{text.parms}</h2>
            <pre><code>{JSON.stringify(params, null, 4)}</code></pre>
        </article>

        <article class="column">
            <h2>{text.config}</h2>
            <pre><code>{JSON.stringify(pageConfig, null, 4)}</code></pre>
        </article>
    </div>
</div>
