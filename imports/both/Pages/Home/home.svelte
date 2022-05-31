<script>/**
 * @summary Layout insert for Home page.
 *
 * @memberof Pages:Home
 * @function home
 * @locus Client
 *
 */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './home_text'

        //** app support files
        import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.mjs";

    let pageText = i18n(page, "page", $lang);
    //let headerText = i18n(header, "header", $lang);

    setContext("pageText", page);
    import TabContent from "../../../components/widgets/tabbedContent.svelte"


</script>


<PageHeader header="{header}" />

<div class="main-content" id="page-layout">

    <div class="row is-centered-vert has-5x-minwidth">
        <section class="column">
            <h2>{pageText.overview}</h2>

            <div class="sub-title">{@html pageText.intro}</div>
        </section>

        <div class="column">
            <figure>
                <img src="/home-page.jpg" class="" alt="Two puppies romping" loading="lazy">
            </figure>
        </div>
    </div>

    <figure class="blockquote">
        <blockquote>
            <p>{@html pageText.quote}</p>
        </blockquote>
    </figure>

    <div class="row">
        <div class="column">
            <section class="box-shadow">
                <h2 class="has-text-secondary has-text-centered">{pageText.philosophy.title}</h2>

                <ul>
                    {#each pageText.philosophy.body as item}
                        <li class="">
                            {item}
                        </li>
                    {/each}
                </ul>
            </section>
        </div>

        <div class="column">

        </div>
    </div>
</div>




<!--
<PageWrapper {header} >

    <section class="buffer-y-large">
        <div class="columns is-vcentered">
            <div class="column">
                <div class="lead content">{@html pageText.intro}</div>
            </div>

            <div class="column">
                <figure class="mb-3 has-text-right">
                    <img src="/home-page.jpg" class="" style="max-width: 200rem;" alt="home-image">
                </figure>
            </div>
        </div>
    </section>

    <section class="buffer-y-large">
        <article class="message">
            <div class="message-body">
                {@html pageText.quote}
            </div>
        </article>
    </section>

    <section class="buffer-y-large">
        <div class="columns">

            <div class="column">
                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.philosophy.title}</h1>

                    <ul>
                        {#each pageText.philosophy.body as item}
                            <li class="mb-2">
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.packages.title}</h1>

                    <ul>
                        {#each pageText.packages.body as item}
                            <li class="mb-2">
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="column is-7">
                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.features.title}</h1>

                    <ul>
                        {#each pageText.features.body as item}
                            <li class="mb-2 {item ? '' : 'noDecoration'}" >
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="buffer-y-large">
        <div class="title is-size-4 has-text-info">{pageText.explore}</div>
        <TabContent text="tabbed" tabSettings="is-fullwidth" />
    </section>

    <section class="buffer-y-large">
        <div class="title is-size-4 has-text-info">{pageText.defTitle}</div>
        <div class="content">{@html pageText.definition}</div>
    </section>

</PageWrapper>



<style>
    .noDecoration {
        list-style-type: none;
        height: 1rem;
    }
</style>
-->
