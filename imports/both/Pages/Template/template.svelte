<script>/**
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
        import {header, page} from './template_text'
        import {pageConfig} from './template_config'

        //** app support files
        import { onMount, onDestroy } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {lang} from '/imports/client/systemStores';
    import {i18n} from '/imports/Functions/utilities/i18n';

    //* page-body Functions *************************
    import {injectText} from "./functions/injectText";
    const pageHeader = i18n(header, "", $lang);

    //* page controls / logic ***********************
    let message = "";
    let textWith = "";
    let textWithout = "";

    let text = i18n( page, "page", $lang);

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
    <h2>{text.examples}</h2>

    <div class="row">
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



    <!-- Instructional information only - can be deleted -->
    <hr class="space-vert-large" />

    <h2>{text.files}</h2>

    <p>{@html text.preamble}</p>

    <div class="table-scroll">
        <table class="table is-striped scrollbreak-col-4">
            <thead>
            <tr>
                {#each text.thead as label}
                    <th>{label}</th>
                {/each}
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>{text._nav.name}</td>
                <td>{text._nav.locus}</td>
                <td>nav:object, <br />link:string, <br />icon: string, <br />roles: object</td>
                <td>{text._nav.desc}</td>
            </tr>

            <tr>
                <td>{text._text.name}</td>
                <td>{text._text.locus}</td>
                <td>header:object, <br />page:object</td>
                <td>{text._text.desc}</td>
            </tr>

            <tr>
                <td>{text._loader.name}</td>
                <td>{text._loader.locus}</td>
                <td>function: extends SvelteComponent</td>
                <td>{text._loader.desc}</td>
            </tr>

            <tr>
                <td>{text._route.name}</td>
                <td>{text._route.locus}</td>
                <td>default:object</td>
                <td>{text._route.desc}</td>
            </tr>

            <tr>
                <td>{text._svelte.name}</td>
                <td>{text._svelte.locus}</td>
                <td></td>
                <td>{text._svelte.desc}</td>
            </tr>

            <tr>
                <td>{text._config.name}</td>
                <td>{text._config.locus}</td>
                <td>pageConfig:object</td>
                <td>{text._config.desc}</td>
            </tr>

            <tr>
                <td>{text._functions.name}</td>
                <td>{text._functions.locus}</td>
                <td></td>
                <td>{text._functions.desc}</td>
            </tr>

            <tr>
                <td>{@html text._tests.name}</td>
                <td>{text._tests.locus}</td>
                <td></td>
                <td>{text._tests.desc}</td>
            </tr>

            </tbody>
        </table>
    </div>


    <hr class="space-vert-large" />

    <h2>{text.props}</h2>

    <p>{text.propsDesc}</p>

    <div class="row has-4x-minwidth">
        <article class="column">
            <h3>{text.route}</h3>
            <pre><code>{JSON.stringify(currentRoute, null, 4)}</code></pre>
        </article>

        <article class="column">
            <h3>{text.params}</h3>
            <pre><code>{JSON.stringify(params, null, 4)}</code></pre>
        </article>

        <article class="column">
            <h3>{text.query}</h3>
            <pre><code>{JSON.stringify(query, null, 4)}</code></pre>
        </article>

        <article class="column">
            <h3>{text.config}</h3>
            <pre><code>{JSON.stringify(pageConfig, null, 4)}</code></pre>
        </article>
    </div>
</main>
