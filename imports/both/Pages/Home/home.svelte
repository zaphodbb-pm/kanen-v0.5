<script>
/**
 * Site home page with project commentary
 *
 * @name home
 * @module
 * @memberOf Pages:home
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
        import {header, page} from './home_text'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../Functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.js";

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
    const tabbed = i18n(page.components, "tabbed", $lang);

    import TabContent from "../../../Components/widgets/tabbedContent.svelte"

</script>


<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="row is-centered-vert has-5x-minwidth" data-tp_main>
        <section class="column">
            <h2>{pageText.overview}</h2>

            <div>{@html pageText.intro}</div>
        </section>

        <div class="column">
            <figure>
                <img src="/home-page.jpg" alt="Two puppies with shoe">
            </figure>
        </div>
    </div>

    <figure class="blockquote space-container-vert" data-tp1_figure>
        <blockquote>
            <p>{@html pageText.quote}</p>
        </blockquote>
        <figcaption>{@html pageText.cite}</figcaption>
    </figure>

    <div class="space-component-large"></div>

    <h2>{pageText.details}</h2>

    <div class="row" data-tp_notes>
        <div class="column">
            <section class="box-shadow">
                <h3 class="has-text-tertiary has-text-centered">{pageText.philosophy.title}</h3>

                <ul>
                    {#each pageText.philosophy.body as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            </section>

            <div class="space-component"></div>

            <section class="box-shadow">
                <h3 class="has-text-tertiary has-text-centered">{pageText.packages.title}</h3>

                <ul>
                    {#each pageText.packages.body as item}
                        <li>{@html item}</li>
                    {/each}
                </ul>
            </section>
        </div>

        <div class="column">
            <section class="box-shadow">
                <h3 class="has-text-tertiary has-text-centered">{pageText.features.title}</h3>

                {#each pageText.features.body as block}
                    <ul class="space-block-vert">
                        {#each block as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                {/each}
            </section>
        </div>
    </div>

    <section class="space-container-vert" data-tp_tabs>
        <h3 class="has-text-tertiary">{pageText.explore}</h3>
        <TabContent class="is-fullwidth" content="{tabbed}"/>
    </section>
</main>